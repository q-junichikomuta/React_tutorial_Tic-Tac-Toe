import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { memo } from 'react';

type Props = {
  oneSideNum?: number;
  handleChange: (_event: unknown, newValue: string) => void;
};

export const GameModeSelector = memo(({ oneSideNum = 3, handleChange }: Props) => {
  return (
    <ToggleButtonGroup
      id="game-mode-select"
      color="primary"
      size="small"
      value={String(oneSideNum)}
      exclusive
      onChange={handleChange}
    >
      <ToggleButton value="3">3目並べ</ToggleButton>
      <ToggleButton value="4">4目並べ</ToggleButton>
      <ToggleButton value="5">5目並べ</ToggleButton>
    </ToggleButtonGroup>
  );
});
