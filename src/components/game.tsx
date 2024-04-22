import { Button, Stack } from '@mui/material';
import { History } from './history';
import { Square } from './square';
import { PlayBoard } from '@/utils/styleComponents';
import { memo, useCallback } from 'react';
import { useNewMediaQuery } from '@/hooks/useNewMediaQuery';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  checkStatusAtom,
  gameStatusAtom,
  gameTextAtom,
  historyDerivedAtom,
  oneSideNumAtom,
  squareClickAtom,
} from '@/globalStates/atoms';
import { TIMEUPAtom, timeAtom, useCountDownTimer } from '@/hooks/useCountDownTimer';

type Props = {
  // oneSideNum: number;
  // squaresValue?: Value[];
  // squareClick: (i: number) => void;
};

// valueを反映させたsquareを生成
const SquareAll = memo(() => {
  const oneSideNum = useAtomValue(oneSideNumAtom);
  // const { startTime } = useCountDownTimer();

  const squareClick = useSetAtom(squareClickAtom);

  const onClick = useCallback((i: number) => {
    // startTime();
    squareClick(i);
  }, []);

  return (
    <PlayBoard repeat={oneSideNum}>
      {[...Array(oneSideNum * oneSideNum)].map((_, i) => (
        <Square
          key={`Square-${i}`} // 今回はindexでKeyを付けたが、ユニークIDなどがあればそれをつける
          onClick={onClick}
          num={i}
        />
      ))}
    </PlayBoard>
  );
});

const SurrenderButton = memo(() => {
  const setGameStatus = useSetAtom(gameStatusAtom);
  const onClick = useCallback(() => {
    setGameStatus('win');
  }, []);

  return (
    <Button variant="contained" size="small" color="error" onClick={onClick}>
      投了
    </Button>
  );
});

const TimeDisplay = memo(() => {
  const time = useAtomValue(timeAtom);
  const TIMEUP = useAtomValue(TIMEUPAtom);
  return <div>{TIMEUP ? '時間切れ' : `制限時間:${time}秒`}</div>;
});

const GameStatusDisplay = memo(() => {
  const gameText = useAtomValue(gameTextAtom);
  return <div>{gameText}</div>;
});

export const Game = memo(() => {
  // レスポンシブを取得
  const { isSp } = useNewMediaQuery();

  return (
    <Stack spacing={2} direction={isSp ? 'column' : 'row'} alignItems="center" justifyContent="center">
      <Stack>
        <GameStatusDisplay />
        <TimeDisplay />
        <SquareAll />
        <SurrenderButton />
      </Stack>
      <History />
    </Stack>
  );
});
