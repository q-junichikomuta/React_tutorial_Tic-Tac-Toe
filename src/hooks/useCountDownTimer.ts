import { MutableRefObject, useCallback, useRef, useState } from 'react';

export const useCountDownTimer = () => {
  const defaultTime = 3;
  const intervalID: MutableRefObject<number | undefined> = useRef(undefined);
  const [time, setTime] = useState<number>(defaultTime);

  const stopTime = useCallback(() => {
    clearInterval(intervalID.current);
    // intervalID.current = undefined;
  }, [intervalID]);

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
  }, [setTime, stopTime]);

  const startTime = useCallback(() => {
    if (time >= 0) {
      resetTime();
    }
    intervalID.current = window.setInterval(countDown, 1000);
  }, [time, resetTime, intervalID, countDown]);
  return { time, startTime, stopTime, resetTime };
};
