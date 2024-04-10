'use client';

import { useCallback, useState } from 'react';
import { Stack } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Game } from '@/components/game';
import { GameModeSelector } from '@/components/gameModeSelector';
import { DarkModeButton } from '@/components/darkModeButton';
import { styleComponents } from '@/utils/styleComponents';
import { useDarkMode } from '@/hooks/useDrakMode';
import { mediaQuery, useMediaQuery } from '@/hooks/useMedisQuery';
import { ResponsiveProvider } from '@/components/responsiveProvider';
import { DarkModeProvider } from '@/components/darkModeProvider';

export default function Home() {
  const [oneSideNum, setOneSideNum] = useState(3); // 一辺の長さ = n目並べのn
  const { isDarkMode, handleDrakMode } = useDarkMode(); // ダークモードを管理するカスタムフック
  const isSp = useMediaQuery(mediaQuery.sp); // レスポンシブを管理するカスタムフック

  // MUIコンポーネント用のテーマ
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const { Wrapper } = styleComponents(isDarkMode);

  const oneSideNumChange = useCallback((_event: unknown, newValue: string) => {
    if (newValue !== null) {
      setOneSideNum(Number(newValue));
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <DarkModeProvider value={isDarkMode}>
        <ResponsiveProvider value={isSp}>
          <Wrapper key={`${oneSideNum}-GameMode`}>
            <Stack spacing={2} direction={isSp ? 'column' : 'row'} alignItems="center" justifyContent="center">
              <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                <GameModeSelector oneSideNum={oneSideNum} handleChange={oneSideNumChange} />
                <DarkModeButton handleDrakMode={handleDrakMode} />
              </Stack>
              <Game oneSideNum={oneSideNum} />
            </Stack>
          </Wrapper>
        </ResponsiveProvider>
      </DarkModeProvider>
    </ThemeProvider>
  );
}
