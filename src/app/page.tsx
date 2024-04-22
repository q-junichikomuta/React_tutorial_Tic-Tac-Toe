'use client';

import { useCallback, useMemo, useState } from 'react';
import { Stack } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Game } from '@/components/game';
import { GameModeSelector } from '@/components/gameModeSelector';
import { DarkModeButton } from '@/components/darkModeButton';
import { TitleStyle, Wrapper2, styleComponents } from '@/utils/styleComponents';
import { useDarkMode } from '@/hooks/useDarkMode';
import { mediaQuery, useMediaQuery } from '@/hooks/useMediaQuery';
import { ResponsiveProvider } from '@/components/responsiveProvider';
import { DarkModeProvider } from '@/components/darkModeProvider';
import { useNewMediaQuery } from '@/hooks/useNewMediaQuery';

// Jotaiのimport
import { useAtom } from 'jotai';
import { oneSideNumAtom } from '../globalStates/atoms';

export default function Home() {
  // 一辺の長さ = n目並べのn

  const { isDarkMode, handleDarkMode } = useDarkMode(); // ダークモードを管理するカスタムフック
  const { isSp } = useNewMediaQuery();

  // const isSp = useMediaQuery(mediaQuery.sp); // レスポンシブを管理するカスタムフック
  // console.log(isSp);

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

  // const { Wrapper } = styleComponents(isDarkMode);
  const [oneSideNum, setOneSideNum] = useAtom(oneSideNumAtom);
  // const oneSideNumChange = useCallback((_event: unknown, newValue: string) => {
  //   if (newValue !== null) {
  //     setOneSideNum(Number(newValue));
  //   }
  // }, []);

  return (
    <ThemeProvider theme={theme}>
      <DarkModeProvider value={isDarkMode}>
        <ResponsiveProvider value={isSp}>
          <Wrapper2 darkMode={isDarkMode}>
            <Stack spacing={2} direction={isSp ? 'column' : 'row'} alignItems="center" justifyContent="center">
              <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                <Stack spacing={1}>
                  <TitleStyle darkMode={isDarkMode}>ゲームモードを選択</TitleStyle>
                  <GameModeSelector />
                </Stack>
                <DarkModeButton handleDarkMode={handleDarkMode} />
              </Stack>
              <Game />
            </Stack>
          </Wrapper2>
        </ResponsiveProvider>
      </DarkModeProvider>
    </ThemeProvider>
  );
}
