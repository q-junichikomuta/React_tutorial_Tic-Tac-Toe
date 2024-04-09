import { calculateWinner } from '@/utils/calc';
import { Square } from './square';
import { BoardRow, Wrapper } from '@/utils/styleComponents';

export const Board = ({ nextPlayer, squares, onPlay, squaresNum }: PropBoard) => {
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
    const row = Math.floor(i / squaresNum); // わかりやすく書く
    const col = i % squaresNum; // わかりやすく書く

    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = nextPlayer ? 'X' : 'O';
    onPlay(nextSquares, { row, col });
  };

  const squareAll = [...Array(squaresNum * squaresNum)].map((_, i) => (
    <Square
      key={`Square-${i + 1}`} // 今回はindecでKeyを付けたが、ユニークIDなどがあればそれをつける
      value={squares[i]}
      onClick={() => handleClick(i)}
      winLine={winLines?.includes(i) ? winLines : null}
    />
  ));

  const borad = [...Array(squaresNum)].map((_, i) => (
    <BoardRow key={`BoardRow-${i + 1}`}>{squareAll.slice(i * squaresNum, (i + 1) * squaresNum)}</BoardRow>
  ));

  return (
    <Wrapper>
      <div>{status}</div>
      <div>{borad}</div>
    </Wrapper>
  );
};
