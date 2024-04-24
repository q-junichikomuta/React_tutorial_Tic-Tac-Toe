import { gameStatusAtom } from '@/globalStates/gameStatusAtom';
import { squareValueAtom, squareWonLineAtom } from '@/globalStates/squareValueAtom';
import { SquareStyle } from '@/utils/styleComponents';
import { atom, useAtomValue } from 'jotai';
import { memo, useCallback } from 'react';

type Props = {
  onClick: (i: number) => void;
  num: number;
};

/**
 * ゲームの状況がwin,draw,timeupの時にtrueになるAtom
 * gameStatusの更新によって再レンダリングされないように外部のatomを介して定義
 * ここでしか使わないatomなので、ここで定義
 */
const isWinAtom = atom((get) => get(gameStatusAtom) === 'win');
const isDrawAtom = atom((get) => get(gameStatusAtom) === 'draw');
const isTimeupAtom = atom((get) => get(gameStatusAtom) === 'timeup');

export const Square = memo(({ onClick, num }: Props) => {
  const value = useAtomValue(squareValueAtom(num));
  const wonLine = useAtomValue(squareWonLineAtom(num));
  const isWin = useAtomValue(isWinAtom);
  const isDraw = useAtomValue(isDrawAtom);
  const isTimeup = useAtomValue(isTimeupAtom);

  const isNotPlay = value !== null || isTimeup || isWin || isDraw;

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
});
