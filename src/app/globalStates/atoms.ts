import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import Message from '@/app/models/message';
import { positionGenerator } from '@/utils/positionGenerator';
import { atomFamily } from 'jotai/utils';

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
export const gameTextAtom = atom('');
export const gameTextDerivedAtom = atom(
  (get) => get(gameTextAtom),
  (get, set, status: Status) => {
    set(gameStatusAtom, status);

    const gameStatus = get(gameStatusAtom);
    const nextPlayer = get(nextPlayerAtom);

    // gameStatusに合わせてgameTextを更新
    if (gameStatus === 'before') {
      const oneSideNum = get(oneSideNumAtom);
      set(gameTextAtom, `${oneSideNum}目並べで勝負！`);
    } else if (gameStatus === 'draw') {
      set(gameTextAtom, '====引き分け====');
    } else if (gameStatus === 'winX' || gameStatus === 'winO') {
      set(gameTextAtom, gameStatus === 'winX' ? '勝者:X' : '勝者:O');
    } else if (gameStatus === 'interval') {
      return '待機中・・・';
    } else {
      return `${nextPlayer ? '次の手番:X' : '次の手番:O'}`;
    }
  }
);

// 初期値を反映させる
gameTextDerivedAtom.onMount = (setAtom) => {
  setAtom('before');
  return;
};

export const wonLineAtom = atom<WonLine>(null); // 一列揃ったライン

// pageを管理するState
export const pageAtom = atom(0);

export const historyDefaultAtom = atom((get) => {
  const oneSideNum = get(oneSideNumAtom);
  return [
    {
      value: Array(oneSideNum * oneSideNum).fill(null),
      position: null,
    },
  ];
});

export const historyAtom = atomFamily((oneSideNum: number) =>
  atom<HistoryType[]>([
    {
      value: Array(oneSideNum * oneSideNum).fill(null),
      position: null,
    },
  ])
);

export const historyTextAtom = atom('試合待機中・・・');

export const historyTextDerivedAtom = atom(
  (get) => get(historyTextAtom),
  (get, set, _arg) => {
    const page = get(pageAtom);
    const oneSideNum = get(oneSideNumAtom);
    const historyFamily = historyAtom(oneSideNum);
    const history = get(historyFamily);
    const move = history?.map((u, i) => {
      const position = u.position || null;
      return {
        turn: i,
        player: i % 2 === 0 ? 'O' : 'X',
        position: position,
      };
    });
    const text = move[page];

    set(
      historyTextAtom,
      text ? `${text.turn}ターン目 | Pleyer：${text.player} | ${text.position}` : '試合待機中・・・'
    );
  }
);

export const historyDerivedAtom = atom(
  (get) => {
    const oneSideNum = get(oneSideNumAtom);
    const historyFamily = historyAtom(oneSideNum);
    return get(historyFamily);
  },
  (get, set, i: number) => {
    const oneSideNum = get(oneSideNumAtom);
    const currentMove = get(currentMoveAtom);
    const historyFamily = historyAtom(oneSideNum);

    const nextPlayer = get(nextPlayerAtom);

    const position = positionGenerator(oneSideNum);

    const history = get(historyFamily);
    const currentSquares = history[currentMove]; // valueとposition
    const squaresValue = currentSquares.value; // valueのみ

    // squaresValueをもとに新しい値を更新するためコピーする(1次配列なのでsliceメソッドで複製、2次配列以上はJSONなどでディープコピーを行う)
    const latestSquares = squaresValue.slice();
    latestSquares[i] = nextPlayer ? 'X' : 'O'; // 選択したsquareのvalueを更新

    // 今までのhistoryをスプレッド構文+sliceで展開してコピーして、最後に現在の値を追加する
    const latestHistory: HistoryType[] = [
      ...history.slice(0, currentMove + 1),
      { value: latestSquares, position: position[i] },
    ];
    set(historyFamily, latestHistory); // Historyを更新する

    // indexに合わせるために、lengthから-1をして最小値を0にする
    set(currentMoveAtom, latestHistory.length - 1);
    set(pageAtom, latestHistory.length - 1);
    set(historyTextDerivedAtom, null);
  }
);

// const [history, setHistory] = useAtom<HistoryType[]>([
//   {
//     value: Array(oneSideNum * oneSideNum).fill(null),
//     position: null,
//   },
// ]);
