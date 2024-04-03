import { useCalc } from "@/hooks/calc";
import Square from "./square";
import styled from '@emotion/styled'

export function Board({ xIsNext, squares, onPlay, squaresNum }: PropBoard) {
  const calculateWinner = useCalc();

  const Wrapper = styled.div`
    position:flex;
    display:inline-block;
  `

  const BoardRow = styled.div`
    display:flex;
    width:300px;
    height:50px;
    margin:2px;
  `

  const winner = calculateWinner(squares, squaresNum);
  const winPlayer = winner?.winplayer
  const winLines = winner ? winner?.winLine : null

  let status;
  if (winner) {
    status = "Winner: " + winPlayer;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick(i: number) {
    const row = Math.floor(i / squaresNum);
    const col = i % squaresNum;

    if (squares[i] || winner) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  const boardRow = []
  for (let row = 0; row < squaresNum; row++) {
    const squaresRow = [];
    for (let col = 0; col < squaresNum; col++) {
      const squaresIndex = row * squaresNum + col;
      console.log("squares", squares);

      squaresRow.push(
        <Square
          key={`Square-${col + 1}`}
          value={squares[squaresIndex]}
          onClick={() => handleClick(squaresIndex)}
          winLine={winLines?.includes(squaresIndex) ? winLines : null}
        />
      )
    }
    boardRow.push(<BoardRow key={`BoardRow-${row + 1}`}>{squaresRow}</BoardRow>)
  }

  return (
    <Wrapper>
      <div>{status}</div>
      <div>{boardRow}</div>
    </Wrapper>
  );
}