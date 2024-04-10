import { calculateWinner } from '@/utils/calc';
import { Square } from './square';
import { BoardRow, GameBoard, Wrapper } from '@/utils/styleComponents';
import { useState } from 'react';
import { winLineGenerator } from '@/utils/winLineGenerator';
import { useCountDownTimer } from '@/hooks/useCountDownTimer';
import { Button, Stack } from '@mui/material';

type Status = 'now' | 'winX' | 'winO' | 'draw';
type WinLine = number[] | null;
type Result = {
  status: Status;
  winLine: WinLine;
};

export const Board = ({ nextPlayer, squares, onPlay, squaresNum }: PropBoard) => {
  const [text, setText] = useState(`${squaresNum}目並べで勝負！`);
  const [result, setResult] = useState<Result>({
    status: 'now',
    winLine: null,
  });
  const { time, startTime, resetTime, stopTime } = useCountDownTimer();

  const status = result.status;
  const winLine = result.winLine;
  const winLines = winLineGenerator(squaresNum);

  const squareValues = [...Array(winLines.length)].map((_, i) => {
    const winLine = winLines[i]; // [0, 1, 2]
    return winLine.map((u) => squares[u]);
  });

  // 勝利判定：一列のうちにnullが含まれておらず、全て同じ文字列であればtrueを返す
  const checkWin = (squareValue: Value[]) =>
    squareValue.includes(null) ? false : squareValue.every((val) => val === squareValue[0]);

  // 引分判定：一列のうち◯と☓の両方が含まれている
  const checkDraw = (squareValue: Value[]) => {
    const checkText = ['X', 'O'];
    const joined = squareValue.join('');

    // 複数の特定要素のうち全部(=XとOが)当てはまったら true を返す
    const isAllIncludes = (arr: string[], target: string) => arr.every((el) => target.includes(el));

    return isAllIncludes(checkText, joined);
  };

  const checkStatus = () => {
    // 先に全ての勝利配列の引分判定を調べる
    const draw = [...Array(winLines.length)].map((_, i) => {
      return checkDraw(squareValues[i]);
    });

    console.log(draw);

    // 全ての勝利配列が引分判定（=XとOが含まれる）だったら、Statusをdrawにする
    if (draw.every((val) => val === true)) {
      setResult((prev) => ({
        ...prev,
        status: 'draw',
      }));
      return;
    }

    // 勝利判定を調べる
    const win = [...Array(winLines.length)].map((_, i) => {
      return checkWin(squareValues[i]);
    });

    console.log(win);

    // 勝利した配列が存在していればStatusを勝者に更新する
    if (win.some((val) => val === true)) {
      const INDEX = win.findIndex((val) => val === true);
      setResult((prev) => ({
        ...prev,
        status: squareValues[INDEX][0] === 'X' ? 'winX' : 'winO',
      }));
      return;
    }

    // 勝利でも引き分けでもなければゲーム続行
    // setStatus('now');
    setResult((prev) => ({
      ...prev,
      status: 'now',
    }));
    return;
  };

  // const winner = calculateWinner(squares, squaresNum);
  // const winPlayer = winner?.winplayer;
  // const winLines = winner ? winner?.winLine : null;

  const updateText = () => {
    if (status === 'draw') {
      setText('====引き分け====');
    } else if (status === 'winX' || status === 'winO') {
      setText(status === 'winX' ? `勝者:X` : `勝者:O`);
    } else {
      setText(nextPlayer ? `次の手番:X` : `次の手番:O`);
    }
  };

  const handleClick = (i: number) => {
    updateText();
    checkStatus();
    // startTime();

    const row = Math.floor(i / squaresNum); // わかりやすく書く
    const col = i % squaresNum; // わかりやすく書く

    if (squares[i] || status === 'winX' || status === 'winO') {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = nextPlayer ? 'X' : 'O';
    onPlay(nextSquares, { row, col });
  };

  const squareAll = [...Array(squaresNum * squaresNum)].map((_, i) => (
    <Square
      key={`Square-${i + 1}`} // 今回はindexでKeyを付けたが、ユニークIDなどがあればそれをつける
      value={squares[i]}
      onClick={() => handleClick(i)}
      winLine={winLines[i]?.includes(i) ? winLine : null}
    />
  ));

  const BoardRows = BoardRow(squaresNum);
  // const borad = [...Array(squaresNum)].map((_, i) => (
  //   <BoardRow key={`BoardRow-${i + 1}`}>{squareAll.slice(i * squaresNum, (i + 1) * squaresNum)}</BoardRow>
  // ));

  return (
    <Stack>
      <div>{text}</div>
      <div>制限時間:{time}秒</div>
      <Button variant="contained" size="small" color="error">
        投了
      </Button>
      <BoardRows>{squareAll}</BoardRows>
    </Stack>
  );
};
