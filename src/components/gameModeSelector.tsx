import { TitleStyle } from '@/utils/styleComponents';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import { MouseEvent } from 'react';

type Props = {
  oneSideNum: number;
  handleChange: (_event: MouseEvent<HTMLElement>, newValue: string) => void;
};

export const GameModeSerector = ({ oneSideNum, handleChange }: Props) => {
  return (
    <div>
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
    </div>
  );
};
