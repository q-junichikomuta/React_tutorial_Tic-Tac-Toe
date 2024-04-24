/**
 * 現在のSquareのバリューと勝利配列を取得するAtoms
 */

import { atom } from 'jotai';
import { historyDerivedAtom } from './historyAtoms';
import { atomFamily } from 'jotai/utils';
import { winLinesAtom } from './boardSizeAtoms';
import { currentMoveAtom, wonLineAtom } from './gameStatusAtom';
import { squareValuesGenerator } from '@/utils/statusCheck';

/**
 * 現在の全ボードのValue
 */
export const squaresValueAtom = atom((get) => {
  const history = get(historyDerivedAtom);
  const currentMove = get(currentMoveAtom);
  const currentSquares = history[currentMove]; // valueとposition
  const squaresValue = currentSquares.value; // valueのみ
  return squaresValue;
});

/**
 * 現在のボードのValueをSquare毎に取り出すAtom
 */
export const squareValueAtom = atomFamily((squareNum: number) => atom((get) => get(squaresValueAtom)[squareNum]));

/**
 * 現在のボードのValueをSquare毎に取り出すAtom
 */
export const squareWonLineAtom = atomFamily((squareNum: number) =>
  atom((get) => get(wonLineAtom)?.includes(squareNum))
);

/**
 * 現在のボードのValueから勝利配列のValueを取り出すAtom
 */
export const squareValueWinLineAtom = atom((get) => {
  const squaresValue = get(squaresValueAtom);
  const winLines = get(winLinesAtom);

  return squareValuesGenerator(squaresValue, winLines);
});
