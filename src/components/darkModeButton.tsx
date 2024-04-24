import { memo } from 'react';
import { Stack, Switch } from '@mui/material';
import { TitleStyle } from '@/utils/styleComponents';
import { useAtomValue } from 'jotai';
import { darkModeAtom, useDarkMode } from '@/hooks/useDarkMode';

export const DarkModeButton = memo(() => {
  const isDarkMode = useAtomValue(darkModeAtom);
  const { handleDarkMode } = useDarkMode(); // ダークモードを管理するカスタムフック

  return (
    <Stack spacing={1}>
      <TitleStyle darkMode={isDarkMode}>ダークモード</TitleStyle>
      <Switch checked={isDarkMode} onChange={handleDarkMode} inputProps={{ 'aria-label': 'dark-mode' }} />
    </Stack>
  );
});
