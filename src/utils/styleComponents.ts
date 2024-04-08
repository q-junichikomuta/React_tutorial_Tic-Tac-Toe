import styled from '@emotion/styled';

// 全体のレイアウトなのでCssで良さそう
export const GameStyled = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
`;

// ゲームのマス目とヒストリーボタン軍→あとでそれぞれのコンポーネントに分ける
export const GameBoard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 3fr;
  grid-template-rows: 1.5fr 1fr 10fr;

  width: 600px;
`;

export const DarkModeSelect = styled.div`
  display: inline-block;
  align-items: center;
`;

export const TitleStyle = styled.div`
  text-align: center;
  padding: 2px;
  color: #696969;
  font-size: 16px;
`;

export const HistoryButton = styled.button`
  background-color: cornsilk;

  border-color: cyan;
  border-size: 5px;

  width: 200px;
  height: 30px;

  margin: 5px;
  padding: 2px;
`;

// export const BoardRow = styled.div`
//   display: grid;
//   grid-template-columns: repeat(3, 1fr);
// `;

export const BoardRow = (repeat: number) => {
  return styled.div`
    display: grid;
    grid-template-columns: repeat(${repeat}, 1fr);
  `;
};

export const SquareStyle = (bgColor: string, valueColor: string) => {
  return styled.button`
    background-color: ${bgColor};
    text-align: center;
    color: turquoise;
    font-size: 25px;

    isplay: inline-block;
    width: 50px;
    height: 50px;
    &:hover {
      background-color: ${valueColor};
    }
  `;
};
