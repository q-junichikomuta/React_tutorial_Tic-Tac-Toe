import { MutableRefObject, useRef, useState } from 'react';

export const useCountDownTimer = () => {
  const defaultTime = 3;
  const intervalID: MutableRefObject<number | undefined> = useRef(undefined);
  const [time, setTime] = useState<number>(defaultTime);

  const countDown = () => {
    setTime((prev) => {
      let currentTime = prev;
      currentTime -= 1;

      if (currentTime <= 0) {
        stopTime();
        return currentTime;
      }
      return currentTime;
    });
  };

  const stopTime = () => {
    clearInterval(intervalID.current);
    // intervalID.current = undefined;
  };

  const resetTime = () => {
    stopTime();
    setTime(defaultTime);
  };

  const startTime = () => {
    if (time >= 0) {
      resetTime();
    }
    intervalID.current = window.setInterval(countDown, 1000);
  };
  return { time, startTime, stopTime };
};
