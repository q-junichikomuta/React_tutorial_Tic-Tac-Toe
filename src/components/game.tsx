import { Button, Stack } from '@mui/material';
import { History } from './history';
import { useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';

import { gameStatusAtom, gameTextAtom, isGameFinishAtom } from '@/globalStates/gameStatusAtom';
import { useNewMediaQuery } from '@/hooks/useMediaQuery';
import { SquareAll } from './squareAll';
import { TimeDisplay } from './timeDisplay';

const GameStatusDisplay = () => {
  const gameText = useAtomValue(gameTextAtom);
  return <div>{gameText}</div>;
};

const SurrenderButton = () => {
  const setGameStatus = useSetAtom(gameStatusAtom);
  const isGameFinish = useAtomValue(isGameFinishAtom); //ゲームが終了したらボタンをdisableにする

  const onClick = useCallback(() => {
    setGameStatus('win');
  }, []);

  return (
    <Button variant="contained" size="small" color="error" onClick={onClick} disabled={isGameFinish}>
      投了
    </Button>
  );
};

export const Game = () => {
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
};
