'use client';

import Game from '@/components/game';
import styled from '@emotion/styled';
import { useState } from 'react';

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Home() {
  const [squaresNum, setSquaresNum] = useState(3);
  const GameStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: auto;
  `;

  const handleChange = (event: SelectChangeEvent) => {
    setSquaresNum(Number(event.target.value));
  };

  return (
    <GameStyled>
      <FormControl variant="standard" sx={{ width: 200 }}>
        <InputLabel id="demo-simple-select-label">対戦モードを選択してください</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={String(squaresNum)}
          size="small"
          label="対戦モード"
          onChange={handleChange}
        >
          <MenuItem value={3}>3×3</MenuItem>
          <MenuItem value={4}>4×4</MenuItem>
          <MenuItem value={5}>5×5</MenuItem>
        </Select>
      </FormControl>
      <Game squaresNum={squaresNum} />
    </GameStyled>
  );
}
