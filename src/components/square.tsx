import { isGameFinishAtom } from '@/globalStates/gameStatusAtom';
import { squareValueAtom, squareWonLineAtom } from '@/globalStates/squareValueAtom';
import { SquareStyle } from '@/utils/styleComponents';
import { atom, useAtomValue } from 'jotai';
import { memo, useCallback } from 'react';

type Props = {
  onClick: (i: number) => void;
  num: number;
};

export const Square = ({ onClick, num }: Props) => {
  const value = useAtomValue(squareValueAtom(num));
  const wonLine = useAtomValue(squareWonLineAtom(num));
  const isGameFinish = useAtomValue(isGameFinishAtom);

  // バリューが入っているか、ゲームが終了していたらtrueを返す
  const isNotPlay = value !== null || isGameFinish;

  const bgColor = () => {
    if (wonLine) {
      return 'white';
    } else if (value) {
      return 'bisque';
    } else {
      return '#525F78';
    }
  };
  const hoverColor = isNotPlay ? '' : 'bisque';

  const click = useCallback(() => {
    onClick(num);
  }, []);

  return (
    <SquareStyle bgColor={bgColor()} hoverColor={hoverColor} onClick={click} disabled={isNotPlay ? true : false}>
      {value}
    </SquareStyle>
  );
};
