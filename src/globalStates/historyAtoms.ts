/**
 * ヒストリーを管理するAtoms
 */

import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { defaultSquareValue, positionAtom } from './boardSizeAtoms';
import { currentMoveAtom, nextPlayerAtom } from './gameStatusAtom';
import { pageAtom } from './pageAtoms';

/**
 * ヒストリーを格納するAtom
 */
export const historyAtom = atomWithReset<HistoryType[]>([]);

/**
 * ゲーム中のヒストリーを表示・更新するAtom
 */
export const historyDerivedAtom = atom(
  (get) => {
    const history = get(historyAtom);

    const defaultValue = {
      value: get(defaultSquareValue),
      position: null,
    };

    return [defaultValue, ...history];
  },
  (get, set, i: number) => {
    const history = get(historyAtom);
    const position = get(positionAtom);
    const currentMove = get(currentMoveAtom);
    const nextPlayer = get(nextPlayerAtom);

    const defaultValue = {
      value: get(defaultSquareValue),
      position: null,
    };

    const currentSquares: HistoryType[] = history.length ? [defaultValue, ...history] : [defaultValue]; // valueとposition
    const squaresValue = currentSquares[currentMove].value; // valueのみ

    // squaresValueをもとに新しい値を更新するためコピーする(1次配列なのでsliceメソッドで複製、2次配列以上はJSONなどでディープコピーを行う)
    const latestSquares = squaresValue.slice();

    latestSquares[i] = nextPlayer ? 'X' : 'O'; // 選択したsquareのvalueを更新

    // 今までのhistoryをスプレッド構文+sliceで展開してコピーして、最後に現在の値を追加する
    const latestHistory: HistoryType[] = [
      ...history.slice(0, currentMove),
      { value: latestSquares, position: position[i] },
    ];
    set(historyAtom, latestHistory); // Historyを更新する

    // indexに合わせるために、lengthから-1をして最小値を0にする
    set(currentMoveAtom, latestHistory.length);
    set(pageAtom, latestHistory.length);
  }
);

/**
 * ヒストリーの状況をテキストで表示するAtom
 */
export const historyTextAtom = atom((get) => {
  const page = get(pageAtom);
  const currentMove = get(currentMoveAtom);
  const history = get(historyDerivedAtom);
  const move = history?.map((u, i) => {
    const position = u.position || null;
    return {
      turn: i,
      player: i % 2 === 0 ? 'O' : 'X',
      position: position,
    };
  });
  const text = move[page];

  // 現在のターンが0(falsy)であれば「試合待機中」を返す
  return currentMove ? `${text.turn}ターン目 | Pleyer：${text.player} | ${text.position}` : '試合待機中・・・';
});

/**
 * ヒストリーの長さを管理するAtom
 * ヒストリー配列のindexとして使用するため、数字をあわせるために -1 をしている
 */
export const historyLengthAtom = atom((get) => get(historyDerivedAtom).length - 1);
