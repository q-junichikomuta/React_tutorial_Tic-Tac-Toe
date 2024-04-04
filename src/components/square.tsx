import { SquareStyle } from '@/utils/styleComponents';

export const Square = ({ value, onClick, winLine }: PropSquare) => {
  const bgColor = winLine ? 'white' : '#525F78';
  const valueColor = value ? '' : 'bisque';
  const Style = SquareStyle(bgColor, valueColor);

  return <Style onClick={onClick}>{value}</Style>;
};
