import { gameStatusAtom } from '@/globalStates/atoms';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// 時間をatomで管理して、timeに関する関数をどのコンポーネントからも操作できるようにする
const defaultTime = 3;
export const timeAtom = atom(defaultTime);
export const TIMEUPAtom = atom((get) => get(timeAtom) <= 0);

export const useCountDownTimer = () => {
  const setTime = useSetAtom(timeAtom);
  const TIMEUP = useAtomValue(TIMEUPAtom);

  // const TIMEUP = useMemo(() => time <= 0, [time]);
  const intervalID: MutableRefObject<number | undefined> = useRef(undefined);

  const gameStatus = useAtomValue(gameStatusAtom);

  const stopTime = useCallback(() => {
    clearInterval(intervalID.current);
  }, []);

  const countDown = useCallback(() => {
    setTime((prev) => {
      let currentTime = prev;
      currentTime -= 1;

      if (currentTime <= 0) {
        stopTime();
        return currentTime;
      }
      return currentTime;
    });
  }, []);

  const resetTime = useCallback(() => {
    stopTime();
    setTime(defaultTime);
  }, []);

  const startTime = useCallback(() => {
    console.log(gameStatus, TIMEUP);

    if (gameStatus === 'win' || gameStatus === 'draw' || TIMEUP) {
      return;
    }
    resetTime();
    intervalID.current = window.setInterval(countDown, 1000);
  }, [gameStatus, TIMEUP]);

  useEffect(() => {
    if (gameStatus === 'interval' || gameStatus === 'win' || gameStatus === 'draw' || TIMEUP) {
      stopTime();
      return;
    } else {
      return;
    }
  }, [gameStatus, TIMEUP]);

  return { startTime, stopTime, resetTime };
};
