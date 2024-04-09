import { Stack, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { useContext } from 'react';
import { DarkModeContext } from '@/app/page';
import { styleComponents } from '@/utils/styleComponents';

type Props = {
  oneSideNum: number;
  handleChange: (_event: unknown, newValue: string) => void;
};

export const GameModeSelector = ({ oneSideNum, handleChange }: Props) => {
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
        onChange={(_e, newVal) => handleChange(_e, newVal)}
      >
        <ToggleButton value="3">3目並べ</ToggleButton>
        <ToggleButton value="4">4目並べ</ToggleButton>
        <ToggleButton value="5">5目並べ</ToggleButton>
      </ToggleButtonGroup>
    </Stack>
  );
};
