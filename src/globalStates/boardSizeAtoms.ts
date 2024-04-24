/**
 * ボードサイズとボードサイズに伴うデフォルト値を管理するAtoms
 */

import { atom } from 'jotai';
import { pageAtom } from './pageAtoms';
import { RESET } from 'jotai/utils';
import { winLineGenerator } from '@/utils/winLineGenerator';
import { positionGenerator } from '@/utils/positionGenerator';
import { historyAtom } from './historyAtoms';
import { currentMoveAtom, gameStatusAtom, wonLineAtom } from './gameStatusAtom';
import { timeAtom } from './timeAtoms';

/**
 * n目並べのn
 */
export const boardSizeAtom = atom<number>(3);

/**
 * ボードサイズを変更に伴い各Atomを初期化する
 */
export const boardSizeChangeAtom = atom(null, (get, set, boardSize: number) => {
  set(boardSizeAtom, boardSize); // ボードサイズを変更
  set(historyAtom, RESET); // ヒストリーを初期化
  set(wonLineAtom, RESET); // 勝利配列を初期化
  set(gameStatusAtom, RESET); // ステータスを初期化
  set(currentMoveAtom, RESET); // 現在のターンを初期化
  set(pageAtom, RESET); // ページを初期化
  set(timeAtom, RESET); //タイマーをリセット
});

// ボードサイズ変更に伴いデフォルトが変更されるAtoms //
/**
 * デフォルトバリューとして、ボードサイズに合わせた数の空配列を生成する
 */
export const defaultSquareValue = atom<Value[]>((get) => {
  const boardSize = get(boardSizeAtom);
  return Array(boardSize * boardSize).fill(null);
});

/**
 * ゲームモードに対する勝利配列を定義（縦,横,斜めのindexを格納した2次元配列）
 * 横[0,1,2]..., 縦[0,3,6]..., 斜め[0,4,8]...
 */
export const winLinesAtom = atom((get) => {
  const boardSize = get(boardSizeAtom);
  return winLineGenerator(boardSize);
});

/**
 * ボードのポジションを横軸アルファベット、縦軸数字で定義
 * 例：横[A0,A1,A2]..., 縦[A0,B0,C0]...
 */
export const positionAtom = atom((get) => {
  const boardSize = get(boardSizeAtom);
  return positionGenerator(boardSize);
});
