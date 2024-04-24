'use client';

import { useMemo } from 'react';
import { Stack } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Game } from '@/components/game';
import { GameModeSelector } from '@/components/gameModeSelector';
import { DarkModeButton } from '@/components/darkModeButton';
import { TitleStyle, Wrapper } from '@/utils/styleComponents';

// Jotaiのimport
import { useAtomValue } from 'jotai';
import { useNewMediaQuery } from '@/hooks/useMediaQuery';
import { darkModeAtom } from '@/globalStates/darkModeAtom';

export default function Home() {
  const isDarkMode = useAtomValue(darkModeAtom);
  const { isSp } = useNewMediaQuery();

  // MUIコンポーネント用のテーマ
  // レンダリング毎に再計算されないようにメモ化
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <Wrapper darkMode={isDarkMode}>
        <Stack spacing={2} direction={isSp ? 'column' : 'row'} alignItems="center" justifyContent="center">
          <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
            <Stack spacing={1}>
              <TitleStyle darkMode={isDarkMode}>ゲームモードを選択</TitleStyle>
              <GameModeSelector />
            </Stack>
            <DarkModeButton />
          </Stack>
          <Game />
        </Stack>
      </Wrapper>
    </ThemeProvider>
  );
}
