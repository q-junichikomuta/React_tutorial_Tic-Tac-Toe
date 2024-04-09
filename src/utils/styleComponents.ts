import styled from '@emotion/styled';

const DarkTheme = {
  'background-color': '#11151B',
  color: 'white',
};

const LightTheme = {
  'background-color': 'cornsilk',
  color: 'black',
};

// ダークモードによってスタイルが変わるコンポーネント
export const styleComponents = (darkMode: boolean) => {
  const Theme = darkMode ? DarkTheme : LightTheme;
  const ThemeBg = Theme['background-color'];
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

// squareを並べるコンポーネント
export const BoardGrid = (repeat: number) => {
  return styled.div`
    display: grid;
    grid-template-columns: repeat(${repeat}, 1fr);
  `;
};

// spuareのスタイルコンポーネント
export const SquareStyle = (bgColor: string, hoverColor: string) => {
  return styled.button`
    background-color: ${bgColor};
    text-align: center;
    color: tomato;
    font-size: 25px;

    isplay: inline-block;
    width: 50px;
    height: 50px;
    &:hover {
      background-color: ${hoverColor};
    }
  `;
};
