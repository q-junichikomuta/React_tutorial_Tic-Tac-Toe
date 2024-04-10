'use client';

import { createContext, useCallback, useState } from 'react';
import { Stack } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Game } from '@/components/game';
import { GameModeSelector } from '@/components/gameModeSelector';
import { DarkModeButton } from '@/components/darkModeButton';
import { styleComponents } from '@/utils/styleComponents';
import { useDarkMode } from '@/hooks/useDrakMode';
import { mediaQuery, useMediaQuery } from '@/hooks/useMedisQuery';

// 全コンポーネントでダークモードおよびレスポンシブを管理したいので、useContextを使用
export const DarkModeContext = createContext(false);
export const ResponsiveContext = createContext(false);

export const Home = () => {
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

  const oneSideNumChange = useCallback(
    (_event: unknown, newValue: string) => {
      if (newValue !== null) {
        setOneSideNum(Number(newValue));
      }
    },
    [oneSideNum]
  );

  return (
    <ThemeProvider theme={theme}>
      <DarkModeContext.Provider value={isDarkMode}>
        <ResponsiveContext.Provider value={isSp}>
          <Wrapper key={`${oneSideNum}-GameMode`}>
            <Stack spacing={2} direction={isSp ? 'column' : 'row'} alignItems="center" justifyContent="center">
              <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                <GameModeSelector oneSideNum={oneSideNum} handleChange={oneSideNumChange} />
                <DarkModeButton handleDrakMode={handleDrakMode} />
              </Stack>
              <Game oneSideNum={oneSideNum} />
            </Stack>
          </Wrapper>
        </ResponsiveContext.Provider>
      </DarkModeContext.Provider>
    </ThemeProvider>
  );
};

export default Home;
