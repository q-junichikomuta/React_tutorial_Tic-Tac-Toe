import { boardSizeAtom, boardSizeChangeAtom } from '@/globalStates/boardSizeAtoms';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';

export const GameModeSelector = () => {
  const boardSizeNum = useAtomValue(boardSizeAtom);
  const boardSizeNumChange = useSetAtom(boardSizeChangeAtom);

  const oneChange = useCallback((_event: unknown, newValue: string) => {
    if (newValue !== null) {
      boardSizeNumChange(Number(newValue));
    }
  }, []);

  return (
    <ToggleButtonGroup
      id="game-mode-select"
      color="primary"
      size="small"
      value={String(boardSizeNum)}
      exclusive
      onChange={oneChange}
    >
      <ToggleButton value="3">3目並べ</ToggleButton>
      <ToggleButton value="4">4目並べ</ToggleButton>
      <ToggleButton value="5">5目並べ</ToggleButton>
    </ToggleButtonGroup>
  );
};
