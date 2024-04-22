import { oneSideNumAtom, oneSideNumChangeAtom } from '@/globalStates/atoms';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { memo, useCallback } from 'react';

export const GameModeSelector = memo(() => {
  const oneSideNum = useAtomValue(oneSideNumAtom);
  const oneSideNumChange = useSetAtom(oneSideNumChangeAtom);

  const oneChange = useCallback((_event: unknown, newValue: string) => {
    if (newValue !== null) {
      oneSideNumChange(Number(newValue));
    }
  }, []);

  return (
    <ToggleButtonGroup
      id="game-mode-select"
      color="primary"
      size="small"
      value={String(oneSideNum)}
      exclusive
      onChange={oneChange}
    >
      <ToggleButton value="3">3目並べ</ToggleButton>
      <ToggleButton value="4">4目並べ</ToggleButton>
      <ToggleButton value="5">5目並べ</ToggleButton>
    </ToggleButtonGroup>
  );
});
