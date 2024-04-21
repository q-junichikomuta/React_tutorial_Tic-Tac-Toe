import { ChangeEvent, memo, useContext } from 'react';
import { Stack, Switch } from '@mui/material';
import { TitleStyle, styleComponents } from '@/utils/styleComponents';
import { DarkModeContext } from '@/utils/context';

type Props = {
  handleDarkMode: (event: ChangeEvent<HTMLInputElement>) => void;
};

export const DarkModeButton = memo(({ handleDarkMode }: Props) => {
  const isDarkMode = useContext(DarkModeContext);

  console.log('DarkModeButtonはレンダリングされました');

  return (
    <Stack spacing={1}>
      <TitleStyle darkMode={isDarkMode}>ダークモード</TitleStyle>
      <Switch checked={isDarkMode} onChange={handleDarkMode} inputProps={{ 'aria-label': 'dark-mode' }} />
    </Stack>
  );
});
