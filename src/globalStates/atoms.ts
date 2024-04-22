import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import Message from '@/app/models/message';
import { positionGenerator } from '@/utils/positionGenerator';
import { atomFamily } from 'jotai/utils';
import { winLineGenerator } from '@/utils/winLineGenerator';
import { checkDraw, checkWin, squareValuesGenerator } from '@/hooks/useGameStatus';
import { TIMEUPAtom } from '@/hooks/useCountDownTimer';

//　グローバルな状態を管理するためのatomを定義
//  atomはjotaiの機能で、状態を管理するためのもの

// 状態：WebSocketコネクション
export const socketAtom = atom(null as unknown as Socket);
// 状態：メッセージ一覧
export const messageBoardAtom = atom<Array<Message>>([
  {
    id: crypto.randomUUID(), // UUIDを生成して各メッセージに固有のIDを付与
    squareValue: Array(0),
  },
]);
// 状態：ユーザー名
export const userNameAtom = atom('');

// n目並べのn
export const oneSideNumAtom = atom<number>(3);

// ゲームの状況を管理するState
export const gameStatusAtom = atom<Status>('before');

// 現在のターン数を管理するState
export const currentMoveAtom = atom(0);

// 現在のターン数が、奇数なら次の手番はPlayerO、偶数なら次の手番はPlayerX
export const nextPlayerAtom = atom((get) => get(currentMoveAtom) % 2 === 0);

// ゲームの状態に合わせて表示するテキスト
export const gameTextAtom = atom((get) => {
  const gameStatus = get(gameStatusAtom);
  const nextPlayer = get(nextPlayerAtom);
  const oneSideNum = get(oneSideNumAtom);

  if (gameStatus === 'before') {
    return `${oneSideNum}目並べで勝負！`;
  } else if (gameStatus === 'draw') {
    return '====引き分け====';
  } else if (gameStatus === 'win') {
    return nextPlayer ? '勝者:O' : '勝者:X';
  } else if (gameStatus === 'interval') {
    return '待機中・・・';
  } else {
    return nextPlayer ? '次の手番:X' : '次の手番:O';
  }
});

export const wonLineAtom = atom<WonLine>(null); // 一列揃ったライン

// pageを管理するState
export const pageAtom = atom(0);

export const historyTextAtom = atom((get) => {
  const page = get(pageAtom);
  const currentMove = get(currentMoveAtom);
  const history = get(historyDerivedAtom);
  const move = history?.map((u, i) => {
    const position = u.position || null;
    return {
      turn: i,
      player: i % 2 === 0 ? 'O' : 'X',
      position: position,
    };
  });
  const text = move[page];

  // 現在のターンが0(falsy)であれば「試合待機中」を返す
  return currentMove ? `${text.turn}ターン目 | Pleyer：${text.player} | ${text.position}` : '試合待機中・・・';
});

const historysAtom = atom<HistoryType[]>([]);

const defaultSquareValue = atom<Value[]>((get) => {
  const oneSideNum = get(oneSideNumAtom);
  return Array(oneSideNum * oneSideNum).fill(null);
});

/**
 * ゲームモードに対する勝利配列を定義（縦,横,斜めのindexを格納した2次元配列）
   横[0,1,2]..., 縦[0,3,6]..., 斜め[0,4,8]...
 */
export const winLinesAtom = atom((get) => {
  const oneSideNum = get(oneSideNumAtom);
  return winLineGenerator(oneSideNum);
});

const positionAtom = atom((get) => {
  const oneSideNum = get(oneSideNumAtom);
  return positionGenerator(oneSideNum);
});

export const historyDerivedAtom = atom(
  (get) => {
    const historys = get(historysAtom);
    // console.log(historys);

    const defaultValue = {
      value: get(defaultSquareValue),
      position: null,
    };

    return [defaultValue, ...historys];
  },
  (get, set, i: number) => {
    const position = get(positionAtom);

    const currentMove = get(currentMoveAtom);

    const historys = get(historysAtom);

    const nextPlayer = get(nextPlayerAtom);

    const defaultValue = {
      value: get(defaultSquareValue),
      position: null,
    };

    const currentSquares: HistoryType[] = historys.length ? [defaultValue, ...historys] : [defaultValue]; // valueとposition
    const squaresValue = currentSquares[currentMove].value; // valueのみ

    // squaresValueをもとに新しい値を更新するためコピーする(1次配列なのでsliceメソッドで複製、2次配列以上はJSONなどでディープコピーを行う)
    const latestSquares = squaresValue.slice();

    latestSquares[i] = nextPlayer ? 'X' : 'O'; // 選択したsquareのvalueを更新

    // 今までのhistoryをスプレッド構文+sliceで展開してコピーして、最後に現在の値を追加する
    const latestHistory: HistoryType[] = [
      ...historys.slice(0, currentMove + 1),
      { value: latestSquares, position: position[i] },
    ];
    set(historysAtom, latestHistory); // Historyを更新する

    // indexに合わせるために、lengthから-1をして最小値を0にする
    set(currentMoveAtom, latestHistory.length);
    set(pageAtom, latestHistory.length);
  }
);

export const historyLengthAtom = atom((get) => get(historyDerivedAtom).length - 1);

// const [history, setHistory] = useAtom<HistoryType[]>([
//   {
//     value: Array(oneSideNum * oneSideNum).fill(null),
//     position: null,
//   },
// ]);

export const oneSideNumChangeAtom = atom(null, (get, set, oneSideNum: number) => {
  set(historysAtom, []);
  set(oneSideNumAtom, oneSideNum);
  set(wonLineAtom, null);
  set(gameStatusAtom, 'before');
  set(currentMoveAtom, 0);
  set(pageAtom, 0);
});

export const updatePageAtom = atom(null, (get, set, pageNum: number) => {
  set(gameStatusAtom, 'interval');
  set(currentMoveAtom, pageNum);

  // はじめからボタンの場合は0を入れて、リスタートするまで履歴は追えるようにしておく
  if (pageNum !== 0) {
    set(pageAtom, pageNum);
  }

  if (get(wonLineAtom)) {
    set(wonLineAtom, null);
  }
});

/**
 * 現在のボードのValue
 */
export const squaresValueAtom = atom((get) => {
  const history = get(historyDerivedAtom);
  const currentMove = get(currentMoveAtom);
  const currentSquares = history[currentMove]; // valueとposition
  const squaresValue = currentSquares.value; // valueのみ
  return squaresValue;
});

/**
 * 現在のボードのValueをSquare毎に取り出すAtom
 */
export const squareValueAtom = atomFamily((squareNum: number) => atom((get) => get(squaresValueAtom)[squareNum]));

/**
 * 現在のボードのValueをSquare毎に取り出すAtom
 */
export const squareWonLineAtom = atomFamily((squareNum: number) =>
  atom((get) => get(wonLineAtom)?.includes(squareNum))
);

/**
 * 現在のボードのValueから勝利配列のValueを取り出すAtom
 */
export const squareValueWinLineAtom = atom((get) => {
  const squaresValue = get(squaresValueAtom);
  const winLines = get(winLinesAtom);

  return squareValuesGenerator(squaresValue, winLines);
});

/**
 * 現在のボードのValueから勝利・引分・継続を判定するAtom
 */
export const checkStatusAtom = atom(null, (get, set) => {
  const winLines = get(winLinesAtom);
  const squareValue = get(squareValueWinLineAtom);

  // 先に全ての勝利配列の引分判定を調べる
  const draw = [...Array(winLines.length)].map((_, i) => {
    return checkDraw(squareValue[i]);
  });

  // 全ての勝利配列が引分判定（=XとOが含まれる）だったら、Statusをdrawにする
  if (draw.every((val) => val === true)) {
    set(gameStatusAtom, 'draw');
    return;
  }

  // 勝利判定を調べる
  const win = [...Array(winLines.length)].map((_, i) => {
    return checkWin(squareValue[i]);
  });

  // 勝利した配列が存在していればStatusを勝者に更新する
  if (win.some((val) => val === true)) {
    const INDEX = win.findIndex((val) => val === true);
    console.log(INDEX, winLines[INDEX]);

    set(gameStatusAtom, 'win');
    set(wonLineAtom, winLines[INDEX]);
    return;
  }

  // 勝利でも引き分けでもなければゲーム続行
  set(gameStatusAtom, 'now');
  return;
});

export const squareClickAtom = atom(null, (get, set, oneSideNum: number) => {
  const gameStatus = get(gameStatusAtom);
  const TIMEUP = get(TIMEUPAtom);

  if (gameStatus === 'win' || gameStatus === 'draw' || TIMEUP) {
    return;
  }
  set(historyDerivedAtom, oneSideNum);
  set(checkStatusAtom);

  return;
});
