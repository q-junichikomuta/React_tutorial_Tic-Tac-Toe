'use client';

import { Game } from '@/components/game';
import { MouseEvent, useState } from 'react';

import { SelectChangeEvent } from '@mui/material/Select';
import { GameModeSerector } from '@/components/gameModeSelector';
import { GameStyled, TitleStyle, Wrapper } from '@/utils/styleComponents';
import { DarkModeButton } from '@/components/darkModeButton';
import { History } from '@/components/history';
import { useDarkMode } from '@/hooks/useDrakMode';

export const Home = () => {
  const [oneSideNum, setOneSideNum] = useState(3); // 一辺の長さ = n目並べのn
  const { isDarkMode, handleDrakMode } = useDarkMode();

  const oneSideNumChange = (_event: MouseEvent<HTMLElement>, newValue: string) => {
    if (newValue !== null) {
      setOneSideNum(Number(newValue));
    }
  };

  return (
    <>
      <GameStyled key={`${oneSideNum}-GameMode`}>
        <GameModeSerector oneSideNum={oneSideNum} handleChange={oneSideNumChange} />
        <DarkModeButton isDarkMode={isDarkMode} handleDrakMode={handleDrakMode} />
        <Game oneSideNum={oneSideNum} />
        <div>{isDarkMode ? 'ダークモードだよ' : 'ライトモードだよ'}</div>
      </GameStyled>
    </>
  );
};

export default Home;
