import { MutableRefObject, useCallback, useRef, useState } from 'react';

export const useCountDownTimer = () => {
  const defaultTime = 3;
  const intervalID: MutableRefObject<number | undefined> = useRef(undefined);
  const [time, setTime] = useState<number>(defaultTime);

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
  }, [time, setTime]);

  const stopTime = useCallback(() => {
    clearInterval(intervalID.current);
    // intervalID.current = undefined;
  }, [time, setTime, intervalID]);

  const resetTime = useCallback(() => {
    stopTime();
    setTime(defaultTime);
  }, [time, setTime, stopTime]);

  const startTime = useCallback(() => {
    if (time >= 0) {
      resetTime();
    }
    intervalID.current = window.setInterval(countDown, 1000);
  }, [time, setTime, resetTime, intervalID]);
  return { time, startTime, stopTime, resetTime };
};
