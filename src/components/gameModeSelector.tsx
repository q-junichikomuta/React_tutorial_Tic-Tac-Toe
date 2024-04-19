import { gameStatusAtom, gameTextDerivedAtom, oneSideNumAtom } from '@/app/globalStates/atoms';
import { useHistory } from '@/hooks/useHistory';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useAtom } from 'jotai';
import { memo, useCallback } from 'react';

// type Props = {
//   oneSideNum?: number;
//   handleChange: (_event: unknown, newValue: string) => void;
// };

export const GameModeSelector = memo(() => {
  const [oneSideNum, setOneSideNum] = useAtom(oneSideNumAtom);

  const { restart } = useHistory();

  const [, setGameStatus] = useAtom(gameTextDerivedAtom);
  const oneSideNumChange = useCallback((_event: unknown, newValue: string) => {
    if (newValue !== null) {
      setOneSideNum(Number(newValue));
      setGameStatus('before');
      restart(_event);
    }
  }, []);

  return (
    <ToggleButtonGroup
      id="game-mode-select"
      color="primary"
      size="small"
      value={String(oneSideNum)}
      exclusive
      onChange={oneSideNumChange}
    >
      <ToggleButton value="3">3目並べ</ToggleButton>
      <ToggleButton value="4">4目並べ</ToggleButton>
      <ToggleButton value="5">5目並べ</ToggleButton>
    </ToggleButtonGroup>
  );
});
