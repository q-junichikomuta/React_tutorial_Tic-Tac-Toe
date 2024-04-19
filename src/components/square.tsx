import { useHistory } from '@/hooks/useHistory';
import { SquareStyle } from '@/utils/styleComponents';
import { memo, useCallback } from 'react';

type Props = {
  value?: Value;
  onClick: (i: number) => void;
  wonLine?: boolean;
  num: number;
};

export const Square = memo(({ value, onClick, wonLine = false, num }: Props) => {
  // const { squaresValue, squareClick } = useHistory();
  const bgColor = () => {
    if (wonLine) {
      return 'white';
    } else if (value) {
      return 'bisque';
    } else {
      return '#525F78';
    }
  };
  const hoverColor = value ? '' : 'bisque';
  // const Style = SquareStyle(bgColor(), hoverColor);
  const valued = value ? 'O' : 'X';

  const squareClick = () => {
    onClick(num);
  };

  console.log(`Square${num}です`);

  return (
    <SquareStyle bgColor={bgColor()} hoverColor={hoverColor} onClick={squareClick} disabled={value ? true : false}>
      {value}
    </SquareStyle>
  );
});
