import styled from '@emotion/styled';

/**
 * ダークモード時のカラー
 */
const DarkTheme = {
  backgroundColor: '#11151B',
  color: 'white',
};

/**
 * ライトモード時のカラー
 */
const LightTheme = {
  backgroundColor: 'cornsilk',
  color: 'black',
};

/**
 * ページ全体のスタイルコンポーネント
 */
export const Wrapper = styled.div<{ darkMode?: boolean }>`
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
export const TitleStyle = styled.div<{ darkMode?: boolean }>`
  color: ${(props) => (props.darkMode ? DarkTheme.color : LightTheme.color)};
  text-align: center;
  padding: 2px;
  font-size: 16px;
  font-weight: 600;
`;

/**
 * Square単体のスタイルコンポーネント
 */
export const SquareStyle = styled.button<{ bgColor: string; hoverColor: string }>`
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
`;

/**
 * SquareをGridで並べるスタイルコンポーネント
 */
export const PlayBoard = styled.div<{ repeat?: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.repeat}, 1fr);
`;
