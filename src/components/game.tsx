import { useEffect, useMemo, useState } from 'react';
import { Board } from './board';
import { BoardGrid } from '@/utils/styleComponents';
import { History } from './history';
import { Button, Stack } from '@mui/material';
import { useGameStatus } from '@/hooks/useGameStatus';
import { positionGenerator } from '@/utils/positionGenerator';
import { Square } from './square';
import { mediaQuery, useMediaQuery } from '@/hooks/useMedisQuery';

export const Game = ({ oneSideNum }: { oneSideNum: number }) => {
  const isSp = useMediaQuery(mediaQuery.sp);

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

  const { text, status, setStatus, wonLine, setWonLine, time, TIMEUP, checkStatus, surrender, resetTime } =
    useGameStatus(oneSideNum, nextPlayer);

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

    const move = history?.map((u, i) => {
      const position = u.position || null;
      return {
        turn: i,
        player: i % 2 === 0 ? 'O' : 'X',
        position: position,
      };
    });
    const text = move[nextMove];
    setHistoryText(`${text.turn}ターン目 | Pleyer：${text.player} | ${text.position}`);
    setStatus('before');
    resetTime();
  };

  const pageUpdate = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    jampTo(value);
    setWonLine(null);
  };

  const squares = currentSquares.value;

  // 横をアルファベット,縦を数字として座標を生成する
  const position = positionGenerator(oneSideNum);

  const squareClick = (i: number) => {
    // 勝利か引分ならゲームを進行を止める
    if (status === 'winX' || status === 'winO' || status === 'draw' || TIMEUP) {
      return;
    }

    const nextSquares = squares.slice();
    nextSquares[i] = nextPlayer ? 'X' : 'O';

    handlePlay(nextSquares, position[i]);
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
    <Stack spacing={2} direction={isSp ? 'column' : 'row'} alignItems="center" justifyContent="center">
      <Stack>
        <div>{text}</div>
        <div>{TIMEUP ? '時間切れ' : `制限時間:${time}秒`}</div>
        <PlayBoard>{squareAll}</PlayBoard>
        <Button variant="contained" size="small" color="error" onClick={surrender}>
          投了
        </Button>
      </Stack>
      <History historyText={historyText} historyLength={history.length - 1} page={page} pageUpdate={pageUpdate} />
    </Stack>
  );
};
