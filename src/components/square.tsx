import {
  gameStatusAtom,
  historyDerivedAtom,
  squareValueAtom,
  squareWonLineAtom,
  squaresValueAtom,
  wonLineAtom,
} from '@/globalStates/atoms';
import { TIMEUPAtom } from '@/hooks/useCountDownTimer';
import { useHistory } from '@/hooks/useHistory';
import { SquareStyle } from '@/utils/styleComponents';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { memo, useCallback } from 'react';

type Props = {
  // value?: Value;
  onClick: (i: number) => void;
  num: number;
};

export const Square = memo(({ onClick, num }: Props) => {
  const value = useAtomValue(squareValueAtom(num));
  const wonLine = useAtomValue(squareWonLineAtom(num)); // 一列揃ったライン

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

  const click = useCallback(() => {
    onClick(num);
  }, []);

  console.log(`Square${num}です`);

  return (
    <SquareStyle bgColor={bgColor()} hoverColor={hoverColor} onClick={click} disabled={value ? true : false}>
      {value}
    </SquareStyle>
  );
});
