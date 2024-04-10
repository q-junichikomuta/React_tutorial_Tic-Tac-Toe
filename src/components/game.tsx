import { useEffect, useMemo, useState } from 'react';
import { Board } from './board';
import { GameBoard, HistoryButton } from '@/utils/styleComponents';
import { History } from './history';

export const Game = ({ oneSideNum }: { oneSideNum: number }) => {
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
  console.log(currentSquares);

  const handlePlay = (nextSquares: Value[], position: Position) => {
    const nextHistory = [...history.slice(0, currentMove + 1), { value: nextSquares, position: position }];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jampTo = (nextMove: number) => {
    setCurrentMove(nextMove);
  };

  const move = history?.map((u, i) => {
    const position = u.position || null;
    return {
      turn: i,
      player: i % 2 === 0 ? 'O' : 'X',
      position: position,
    };
  });

  return (
    <GameBoard>
      <Board nextPlayer={nextPlayer} squares={currentSquares.value} onPlay={handlePlay} oneSideNum={oneSideNum} />
      <button onClick={() => setCurrentMove(0)}>testdayo</button>
      <History rows={move} jampTo={jampTo} />
    </GameBoard>
  );
};
