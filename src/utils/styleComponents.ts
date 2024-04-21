import styled from '@emotion/styled';
import { memo } from 'react';

const DarkTheme = {
  backgroundColor: '#11151B',
  color: 'white',
};

const LightTheme = {
  backgroundColor: 'cornsilk',
  color: 'black',
};

/**
 * ページ全体のスタイルコンポーネント
 */
export const Wrapper2 = styled.div<{ darkMode?: boolean }>`
  ${(props) => (props.darkMode ? DarkTheme : LightTheme)}
  display: flex;
  font-family: sans-serif;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

/**
 * タイトルのスタイルコンポーネント
 */
export const TitleStyle = memo(styled.div<{ darkMode?: boolean }>`
  color: ${(props) => (props.darkMode ? DarkTheme.color : LightTheme.color)};
  text-align: center;
  padding: 2px;
  font-size: 16px;
  font-weight: 600;
`);

/**
 * Square単体のスタイルコンポーネント
 */
export const SquareStyle = memo(styled.button<{ bgColor: string; hoverColor: string }>`
  background-color: ${(props) => props.bgColor};
  text-align: center;
  color: tomato;
  font-size: 25px;

  display: inline-block;
  width: 50px;
  height: 50px;
  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`);

/**
 * SquareをGridで並べるスタイルコンポーネント
 */
export const PlayBoard = memo(styled.div<{ repeat?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.repeat}, 1fr);
`);

// ダークモードによってスタイルが変わるコンポーネント
export const styleComponents = (darkMode: boolean) => {
  const Theme = darkMode ? DarkTheme : LightTheme;
  const ThemeBg = Theme['backgroundColor'];
  const ThemeColor = Theme['color'];

  const ThemeColors = `
  background-color: ${ThemeBg};
  color: ${ThemeColor};
`;

  // 全体のスタイル
  const Wrapper = styled.div`
    ${ThemeColors}
    display: flex;
    font-family: sans-serif;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
  `;

  // タイトルテキスト用のスタイル
  const TitleStyle = styled.div`
    text-align: center;
    padding: 2px;
    color: ${ThemeColor};
    font-size: 16px;
  `;

  return { Wrapper, TitleStyle };
};

// // squareを並べるコンポーネント
// export const BoardGrid = (repeat: number) => styled.div`
//   display: grid;
//   grid-template-columns: repeat(${repeat}, 1fr);
// `;

// // spuareのスタイルコンポーネント
// export const SquareStyle = (bgColor: string, hoverColor: string) => styled.button`
//   background-color: ${bgColor};
//   text-align: center;
//   color: tomato;
//   font-size: 25px;

//   display: inline-block;
//   width: 50px;
//   height: 50px;
//   &:hover {
//     background-color: ${hoverColor};
//   }
// `;
