import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { memo, useContext } from 'react';
import { styleComponents } from '@/utils/styleComponents';
import { DarkModeContext } from '@/utils/context';

type Props = {
  oneSideNum?: number;
  handleChange: (_event: unknown, newValue: string) => void;
};

export const GameModeSelector = memo(({ oneSideNum = 3, handleChange }: Props) => {
  const isDarkMode = useContext(DarkModeContext);
  const { TitleStyle } = styleComponents(isDarkMode);

  return (
    <Stack spacing={1}>
      <TitleStyle>ゲームモードを選択</TitleStyle>
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
    </Stack>
  );
});
