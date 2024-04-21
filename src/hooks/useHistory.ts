import { positionGenerator } from '@/utils/positionGenerator';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useGameStatus } from './useGameStatus';

export const useHistory = (oneSideNum: number) => {
  // Historyのページネーションを管理するState
  const [page, setPage] = useState(0);

  // 現在のターン数を管理するState
  const [currentMove, setCurrentMove] = useState(0);
  // 現在のターン数が、奇数なら次の手番はPlayerO、偶数なら次の手番はPlayerX
  const nextPlayer = currentMove % 2 === 0;

  // Historyを管理するState
  const [history, setHistory] = useState<HistoryType[]>([
    {
      value: Array(oneSideNum * oneSideNum).fill(null),
      position: null,
    },
  ]);

  // Historyの状態をテキストで表示するためのState
  const [historyText, setHistoryText] = useState('試合待機中・・・');

  // ゲームの状態を管理するカスタムフックから必要な関数を呼び出す
  const { text, status, setStatus, wonLine, setWonLine, time, TIMEUP, checkStatus, surrender, resetTime } =
    useGameStatus(oneSideNum, nextPlayer);

  // 現在のボードの状態
  const currentSquares = history[currentMove]; // valueとposition
  const squaresValue = currentSquares.value; // valueのみ

  // ゲーム進行とHistoryに合わせてHistoryのテキストを更新する関数
  const historyTextUpdate = useCallback((historyArray: HistoryType[], index: number) => {
    const move = historyArray?.map((u, i) => {
      const position = u.position || null;
      return {
        turn: i,
        player: i % 2 === 0 ? 'O' : 'X',
        position: position,
      };
    });

    const text = move[index];
    setHistoryText(`${text.turn}ターン目 | Pleyer：${text.player} | ${text.position}`);
  }, []);

  // Historyのページネーションを選択した時の処理
  const pageUpdate = (_event: unknown, pageNum: number) => {
    setCurrentMove(pageNum); // ゲームの状態を指定のターンまで戻す

    setStatus('interval'); // ゲーム進行を一時停止させる
    resetTime(); // 対局時計を一時停止させる

    // pageNumがrestart用の0であれば別のテキストに置き換えて、pageはまだ戻れるようにそのままにする
    if (pageNum !== 0) {
      setPage(pageNum); // 現在のページを更新
      historyTextUpdate(history, pageNum); // 指定のターン時のHistoryのテキストを表示
    } else {
      setHistoryText('はじめからプレイ');
    }

    // 勝利が決まっていた場合は勝利ラインをリセットする
    if (wonLine) {
      setWonLine(null);
    }
  };

  // はじめからプレイするための関数
  const restart = (e: unknown) => {
    pageUpdate(e, 0);
  };

  // squareを選択した時の処理
  const squareClick = (i: number) => {
    // 勝利か引分ならゲームの進行を止める
    if (status === 'winX' || status === 'winO' || status === 'draw' || TIMEUP) {
      return;
    }

    // squaresValueをもとに新しい値を更新するため、sliceを使いディープコピーして、コピーしたものを使う
    const latestSquares = squaresValue.slice();
    latestSquares[i] = nextPlayer ? 'X' : 'O'; // 選択したsquareのvalueを更新

    // 横をアルファベット,縦を数字として座標を生成する
    const position = positionGenerator(oneSideNum);

    // 今までのhistoryをスプレッド構文+sliceで展開してディープコピーをして、最後に現在の値を追加する
    const latestHistory = [...history.slice(0, currentMove + 1), { value: latestSquares, position: position[i] }];
    setHistory(latestHistory); // Historyを更新する

    // indexに合わせるために、lengthから-1をして最小値を0にする
    setCurrentMove(latestHistory.length - 1);
    setPage(latestHistory.length - 1);
    historyTextUpdate(latestHistory, latestHistory.length - 1);

    // 勝利、引分、継続の判定を行う
    checkStatus(latestSquares);
  };
  return {
    text,
    history,
    time,
    surrender,
    wonLine,
    page,
    historyText,
    nextPlayer,
    squaresValue,
    currentSquares,
    squareClick,
    pageUpdate,
    restart,
    TIMEUP,
  };
};
