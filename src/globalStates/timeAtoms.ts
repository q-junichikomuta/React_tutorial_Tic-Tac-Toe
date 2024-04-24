import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { atomEffect } from 'jotai-effect';

import { gameStatusAtom } from './gameStatusAtom';

const defaultTime = 3; // タイマーの初期値
export const timeAtom = atomWithReset(defaultTime);
export const timeUpAtom = atom((get) => get(timeAtom) < 0);

/**
 * gameStatusによってtimeのON/OFFを切り替える関数
 */
const timeSwitchAtom = atom((get) => {
  const gameStatus = get(gameStatusAtom);

  if (gameStatus === 'now') {
    return true;
  } else if (gameStatus) {
    return false;
  }
});

/**
 * gameStatusに伴いカウントダウンを行うatomEffect
 */
export const timeCountDownEffectAtom = atomEffect((get, set) => {
  if (get(timeSwitchAtom)) {
    const countDown = () => {
      set(timeAtom, (prev) => prev - 1);
    };
    const intervalId = setInterval(countDown, 1000);
    return () => clearInterval(intervalId);
  }
});
