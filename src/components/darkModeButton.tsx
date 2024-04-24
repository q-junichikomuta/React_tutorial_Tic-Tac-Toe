import { ChangeEvent, memo, useCallback, useEffect } from 'react';
import { Stack, Switch } from '@mui/material';
import { TitleStyle } from '@/utils/styleComponents';
import { useAtom } from 'jotai';
import { darkModeAtom } from '@/globalStates/darkModeAtom';

export const DarkModeButton = memo(() => {
  const [isDarkMode, setIsDarkMode] = useAtom(darkModeAtom);

  const handleDarkMode = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
  }, []);

  // 初回読み込み時にOSのテーマを読み込む
  useEffect(() => {
    const prefersColorSchemeDark = matchMedia('(prefers-color-scheme: dark)').matches;

    // ダークテーマに設定されていたらisDarkModeをtrueにする
    if (prefersColorSchemeDark) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  return (
    <Stack spacing={1}>
      <TitleStyle darkMode={isDarkMode}>ダークモード</TitleStyle>
      <Switch checked={isDarkMode} onChange={handleDarkMode} inputProps={{ 'aria-label': 'dark-mode' }} />
    </Stack>
  );
});
