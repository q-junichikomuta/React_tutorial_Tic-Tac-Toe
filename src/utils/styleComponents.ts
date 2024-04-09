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
  position: flex;
  display: inline-block;
`;

export const BoardRow = styled.div`
  display: flex;
  width: 300px;
  height: 50px;
  margin: 2px;
`;

export const SquareStyle = (bgColor: string, valueColor: string) => {
  return styled.button`
    background-color: ${bgColor};
    text-align: center;
    color: turquoise;
    font-size: 25px;
    margin: 2px;
    padding: 10px;
    isplay: inline-block;
    width: 50px;
    height: 50px;
    &:hover {
      background-color: ${valueColor};
    }
  `;
};
