import { SquareStyle } from '@/utils/styleComponents';

export const Square = ({ value, onClick, winLine }: PropSquare) => {
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
  const Style = SquareStyle(bgColor(), hoverColor);

  return (
    <Style onClick={onClick} disabled={value ? true : false}>
      {value}
    </Style>
  );
};
