import { Square } from './square';
import { BoardGrid } from '@/utils/styleComponents';
import { Button, Stack } from '@mui/material';
import { positionGenerator } from '@/utils/positionGenerator';
import { useGameStatus } from '@/hooks/useGameStatus';

export const Board = ({ nextPlayer, squares, onPlay, oneSideNum }: PropBoard) => {
  const { text, status, wonLine, time, TIMEUP, checkStatus, surrender } = useGameStatus(oneSideNum, nextPlayer);

  // 横をアルファベット,縦を数字として座標を生成する
  const position = positionGenerator(oneSideNum);

  const squareClick = (i: number) => {
    // 勝利か引分ならゲームを進行を止める
    if (status === 'winX' || status === 'winO' || status === 'draw' || TIMEUP) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = nextPlayer ? 'X' : 'O';
    console.log('nextSquares', nextSquares);

    onPlay(nextSquares, position[i]);
    checkStatus(nextSquares);
  };

  const squareAll = [...Array(oneSideNum * oneSideNum)].map((_, i) => (
    <Square
      key={`Square-${i + 1}`} // 今回はindexでKeyを付けたが、ユニークIDなどがあればそれをつける
      value={squares[i]}
      onClick={() => squareClick(i)}
      winLine={wonLine?.includes(i) ? true : false}
    />
  ));

  const PlayBoard = BoardGrid(oneSideNum);

  return (
    <Stack>
      <div>{text}</div>
      <div>{TIMEUP ? '時間切れ' : `制限時間:${time}秒`}</div>
      <PlayBoard>{squareAll}</PlayBoard>
      <Button variant="contained" size="small" color="error" onClick={surrender}>
        投了
      </Button>
    </Stack>
  );
};
