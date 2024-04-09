import { useMemo, useState } from 'react';
import { Board } from './board';
import { Timer } from './timer';
import { GameBoard } from '@/utils/styleComponents';

export const Game = ({ squaresNum }: { squaresNum: number }) => {
  const [history, setHistory] = useState<HistoryType[]>([
    {
      value: Array(squaresNum * squaresNum).fill(null),
      position: {
        row: null,
        col: null,
      },
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
  };

  const jampTo = (nextMove: number) => {
    setCurrentMove(nextMove);
    console.log('ボタンが押されたよ');
  };

  const move = useMemo(
    () =>
      history.map((u, i) => {
        const { row, col } = u.position || {};
        let description;
        if (i > 0) {
          description = `Go to move #${i} 座標${row}-${col}`;
        } else {
          description = 'Go to game start';
        }
        return (
          <li key={i}>
            <button onClick={() => jampTo(i)}>{description}</button>
          </li>
        );
      }),
    [history, jampTo]
  );

  return (
    <GameBoard>
      <Timer />
      <div className="game-board">
        <Board nextPlayer={nextPlayer} squares={currentSquares.value} onPlay={handlePlay} squaresNum={squaresNum} />
      </div>
      <div className="game-info">
        <ol>{move}</ol>
      </div>
    </GameBoard>
  );
};
