/**
 * ゲームの状況を管理するAtoms
 */

import { atom } from 'jotai';
import { RESET, atomWithReset } from 'jotai/utils';
import { boardSizeAtom, winLinesAtom } from './boardSizeAtoms';
import { squareValueWinLineAtom } from './squareValueAtom';
import { historyDerivedAtom } from './historyAtoms';
import { checkDraw, checkWin } from '@/utils/statusCheck';
import { timeAtom, timeUpAtom } from './timeAtoms';

/**
 * ゲームの状況を管理するState
 */
export const gameStatusAtom = atomWithReset<Status>('before');

/**
 * 勝利が決まった配列
 */
export const wonLineAtom = atomWithReset<WonLine>([]); // 一列揃ったライン

/**
 * 現在のターン数を管理するState
 */
export const currentMoveAtom = atomWithReset(0);

/**
 * 現在のターン数が、奇数なら次の手番はPlayerO、偶数なら次の手番はPlayerX
 */
export const nextPlayerAtom = atom((get) => get(currentMoveAtom) % 2 === 0);

/**
 * ゲームの状況に合わせて表示するテキスト
 */
export const gameTextAtom = atom((get) => {
  const gameStatus = get(gameStatusAtom);
  const nextPlayer = get(nextPlayerAtom);
  const boardSize = get(boardSizeAtom);

  // switch文パターン
  switch (gameStatus) {
    case 'before':
      return `${boardSize}目並べで勝負！`;
    case 'draw':
      return '====引き分け====';
    case 'win':
    case 'timeup':
      return nextPlayer ? '勝者:O' : '勝者:X';
    case 'interval':
      return '待機中・・・';
    default:
      return nextPlayer ? '次の手番:X' : '次の手番:O';
  }
});

/**
 * 現在のボードのValueから勝利・引分・継続を判定するAtom
 */
export const checkStatusAtom = atom(null, (get, set) => {
  // 処理中にタイマーが進行しないように、ステータスを一時停止しておく
  set(gameStatusAtom, 'interval');

  const winLines = get(winLinesAtom);
  const squareValue = get(squareValueWinLineAtom);

  // 先に全ての勝利配列の引分判定を調べる
  const draw = [...Array(winLines.length)].map((_, i) => {
    return checkDraw(squareValue[i]);
  });

  // 全ての勝利配列が引分判定（=XとOが含まれる）だったら、Statusをdrawにする
  if (draw.every((val) => val === true)) {
    set(gameStatusAtom, 'draw');
    return;
  }

  // 勝利判定を調べる
  const win = [...Array(winLines.length)].map((_, i) => {
    return checkWin(squareValue[i]);
  });

  // 勝利した配列が存在していればStatusを勝者に更新する
  if (win.some((val) => val === true)) {
    const INDEX = win.findIndex((val) => val === true);

    set(gameStatusAtom, 'win');
    set(wonLineAtom, winLines[INDEX]);
    return;
  }

  // 勝利でも引き分けでもなければゲーム続行
  set(gameStatusAtom, 'now');
  set(timeAtom, RESET);
  return;
});

/**
 * Squareを選択した時のAtom
 */
export const squareClickAtom = atom(null, (get, set, boardSize: number) => {
  const gameStatus = get(gameStatusAtom);
  const timeUp = get(timeUpAtom);
  set(historyDerivedAtom, boardSize);
  set(checkStatusAtom);

  if (gameStatus === 'win' || gameStatus === 'draw' || timeUp) {
    return;
  }

  return;
});

/**
 * timeUpになったらgameStatusを更新するAtom
 */
export const gameTimeUpAtom = atom(null, (get, set) => {
  const timeUp = get(timeUpAtom);
  timeUp && set(gameStatusAtom, 'timeup');
});
