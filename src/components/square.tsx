import { SquareStyle } from '@/utils/styleComponents';
import { memo } from 'react';

type Props = {
  value: Value;
  onClick: () => void;
  winLine: boolean;
};

export const Square = memo(({ value, onClick, winLine }: Props) => {
  const bgColor = () => {
    if (winLine) {
      return 'white';
    } else if (value) {
      return 'bisque';
    } else {
      return '#525F78';
    }
  };
  const hoverColor = value ? '' : 'bisque';
  // const Style = SquareStyle(bgColor(), hoverColor);

  return (
    <SquareStyle bgColor={bgColor()} hoverColor={hoverColor} onClick={onClick} disabled={value ? true : false}>
      {value}
    </SquareStyle>
  );
});
