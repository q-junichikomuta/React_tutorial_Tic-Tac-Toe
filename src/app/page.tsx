'use client';

import { Game } from '@/components/game';
import { MouseEvent, createContext, useState } from 'react';

import { SelectChangeEvent } from '@mui/material/Select';
import { GameModeSerector } from '@/components/gameModeSelector';
import { styleComponents } from '@/utils/styleComponents';
import { DarkModeButton } from '@/components/darkModeButton';
import { History } from '@/components/history';
import { useDarkMode } from '@/hooks/useDrakMode';
import { mediaQuery, useMediaQuery } from '@/hooks/useMedisQuery';
import { Stack } from '@mui/system';
import { ThemeProvider, createTheme } from '@mui/material/styles';

// 全コンポーネントでダークモードおよびレスポンシブを管理したいので、useContextを使用
export const DarkModeContext = createContext(false);
export const ResponsiveContext = createContext(false);

export const Home = () => {
  const [oneSideNum, setOneSideNum] = useState(3); // 一辺の長さ = n目並べのn
  const { isDarkMode, handleDrakMode } = useDarkMode();
  const isSp = useMediaQuery(mediaQuery.sp);

  // MUIコンポーネント用のテーマ
  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
    },
  });

  const { Wrapper } = styleComponents(isDarkMode);

  const oneSideNumChange = (_event: MouseEvent<HTMLElement>, newValue: string) => {
    if (newValue !== null) {
      setOneSideNum(Number(newValue));
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <DarkModeContext.Provider value={isDarkMode}>
        <ResponsiveContext.Provider value={isSp}>
          <Wrapper key={`${oneSideNum}-GameMode`}>
            <Stack spacing={2} direction={isSp ? 'column' : 'row'} alignItems="center" justifyContent="center">
              <Stack spacing={2} direction="row" alignItems="center" justifyContent="center">
                <GameModeSerector oneSideNum={oneSideNum} handleChange={oneSideNumChange} />
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
