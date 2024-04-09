import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';

export const useHistory = (oneSideNum: number) => {
  const [page, setPage] = useState(0);

  const [historyText, setHistoryText] = useState('試合待機中・・・');
  const [history, setHistory] = useState<HistoryType[]>([
    {
      value: Array(oneSideNum * oneSideNum).fill(null),
      position: null,
    },
  ]);

  // 現在のターン数を管理するState
  const [currentMove, setCurrentMove] = useState(0);

  // 現在のターン数が、奇数なら次の手番はO、偶数なら次の手番はX
  const nextPlayer = currentMove % 2 === 0;

  const currentSquares = history[currentMove];

  const handlePlay = (nextSquares: Value[], position: Position) => {
    const nextHistory = [...history.slice(0, currentMove + 1), { value: nextSquares, position: position }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
    setPage(nextHistory.length - 1);

    const move = nextHistory?.map((u, i) => {
      const position = u.position || null;
      return {
        turn: i,
        player: i % 2 === 0 ? 'O' : 'X',
        position: position,
      };
    });

    const text = move[nextHistory.length - 1];
    setHistoryText(`${text.turn}ターン目 | Pleyer：${text.player} | ${text.position}`);
  };

  const jampTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const pageUpdate = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    jampTo(value - 1);
  };

  return { page, historyText, nextPlayer, currentSquares, handlePlay, pageUpdate };
};
