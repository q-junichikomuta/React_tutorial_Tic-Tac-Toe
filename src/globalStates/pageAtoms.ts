/**
 * ヒストリーのページネーションを管理するAtoms
 */

import { atom } from 'jotai';
import { RESET, atomWithReset } from 'jotai/utils';
import { currentMoveAtom, gameStatusAtom, wonLineAtom } from './gameStatusAtom';
import { timeAtom } from './timeAtoms';

/**
 * pageを管理するAtom
 */
export const pageAtom = atomWithReset(0);

/**
 * ページネーション用の関数
 * */
export const updatePageAtom = atom(null, (get, set, pageNum: number) => {
  set(gameStatusAtom, 'interval'); // ヒストリー確認中は試合の進行を一時停止する
  set(currentMoveAtom, pageNum); // 選択したページの試合状況を画面に表示する
  set(timeAtom, RESET); //タイマーをリセット

  // はじめからボタンの場合は0を入れて、リスタートするまでヒストリーは追えるようにしておく
  if (pageNum !== 0) {
    set(pageAtom, get(currentMoveAtom));
  }

  if (get(wonLineAtom)) {
    set(wonLineAtom, RESET);
  }
});
