import { Game } from '@/components/game';
import { ChangeEvent, MouseEvent, memo, useEffect, useState } from 'react';

import { SelectChangeEvent } from '@mui/material/Select';
import { GameModeSerector } from '@/components/gameModeSelector';
import { DarkModeSelect, GameStyled, TestFont, TitleStyle } from '@/utils/styleComponents';
import { Switch } from '@mui/material';
import { useDarkMode } from '@/hooks/useDrakMode';

type Props = {
  isDarkMode: boolean;
  handleDrakMode: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const DarkModeButton = ({ isDarkMode, handleDrakMode }: Props) => {
  const Fonts = TestFont(isDarkMode);

  return (
    <DarkModeSelect>
      <TitleStyle>ダークモード</TitleStyle>
      <Switch checked={isDarkMode} onChange={handleDrakMode} inputProps={{ 'aria-label': 'dark-mode' }} />
      <Fonts>aaa</Fonts>
    </DarkModeSelect>
  );
};
