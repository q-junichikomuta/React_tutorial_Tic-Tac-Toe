import { gameStatusAtom } from '@/app/globalStates/atoms';
import { atom, useAtom } from 'jotai';
import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';

// 時間をatomで管理して、timeに関する関数をどのコンポーネントからも操作できるようにする
const defaultTime = 3;
const timeAtom = atom(defaultTime);

export const useCountDownTimer = () => {
  const [time, setTime] = useAtom(timeAtom);

  const TIMEUP = useMemo(() => time <= 0, []);
  const intervalID: MutableRefObject<number | undefined> = useRef(undefined);

  const [status] = useAtom(gameStatusAtom);

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
    if (!TIMEUP) {
      resetTime();
    }
    intervalID.current = window.setInterval(countDown, 1000);
  }, [TIMEUP]);

  useEffect(() => {
    if (status === 'interval' || status === 'winX' || status === 'winO' || status === 'draw' || TIMEUP) {
      stopTime();
      return;
    } else {
      return;
    }
  }, [status]);

  return { time, startTime, stopTime, resetTime, TIMEUP };
};
