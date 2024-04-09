import { MutableRefObject, useCallback, useRef, useState } from 'react';

export function useTimer() {
  const defaultTime = 3;
  const intervalID: MutableRefObject<number | undefined> = useRef(undefined);
  const [time, setTime] = useState<number>(defaultTime);

  const countDown = () => {
    setTime((prev) => {
      let currentTime = prev;
      currentTime -= 1;
      console.log('currentTime', currentTime);

      if (currentTime <= 0) {
        stopTime();
        console.log('おわりだよ');
        return currentTime;
      }

      return currentTime;
    });
    // console.log('time', time);
    // console.log('currentTime', currentTime);
    // console.log('intervalID.current', intervalID.current);
  };

  const startTime = () => {
    if (time <= 0) {
      resetTime();
    }
    intervalID.current = window.setInterval(countDown, 1000);
  };

  const resetTime = () => {
    setTime(defaultTime);
  };

  const stopTime = () => {
    clearInterval(intervalID.current);
    // intervalID.current = undefined;
  };

  return { time, startTime, resetTime, stopTime };
}
