import { Game } from '@/components/game';
import { ChangeEvent, MouseEvent, memo, useContext, useEffect, useState } from 'react';

import { styleComponents } from '@/utils/styleComponents';
import { Switch } from '@mui/material';
import { DarkModeContext } from '@/app/page';

type Props = {
  handleDrakMode: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const DarkModeButton = ({ handleDrakMode }: Props) => {
  const isDarkMode = useContext(DarkModeContext);
  const { TitleStyle } = styleComponents(isDarkMode);

  return (
    <>
      <TitleStyle>ダークモード</TitleStyle>
      <Switch checked={isDarkMode} onChange={handleDrakMode} inputProps={{ 'aria-label': 'dark-mode' }} />
    </>
  );
};
