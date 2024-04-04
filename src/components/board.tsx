import { useCalc } from '@/utils/calc';
import { Square } from './square';
import { BoardRow, Wrapper } from '@/utils/styleComponents';

export const Board = ({ nextPlayer, squares, onPlay, squaresNum }: PropBoard) => {
  const calculateWinner = useCalc();

  const winner = calculateWinner(squares, squaresNum);
  const winPlayer = winner?.winplayer;
  const winLines = winner ? winner?.winLine : null;

  let status;
  if (winPlayer === 'Draw') {
    status = '====引き分け====';
  } else if (winner) {
    status = `Winner:${winPlayer}`;
  } else {
    status = `Next player:${nextPlayer ? 'X' : 'O'}`;
  }

  const handleClick = (i: number) => {
    // startTime();
    const row = Math.floor(i / squaresNum);
    const col = i % squaresNum;

    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = nextPlayer ? 'X' : 'O';
    onPlay(nextSquares, { row, col });
  };

  const boardRow = [];
  for (let row = 0; row < squaresNum; row++) {
    const squaresRow = [];
    for (let col = 0; col < squaresNum; col++) {
      const squaresIndex = row * squaresNum + col;
      squaresRow.push(
        <Square
          key={`Square-${col + 1}`}
          value={squares[squaresIndex]}
          onClick={() => handleClick(squaresIndex)}
          winLine={winLines?.includes(squaresIndex) ? winLines : null}
        />
      );
    }
    boardRow.push(<BoardRow key={`BoardRow-${row + 1}`}>{squaresRow}</BoardRow>);
  }

  return (
    <Wrapper>
      <div>{status}</div>
      <div>{boardRow}</div>
    </Wrapper>
  );
};
