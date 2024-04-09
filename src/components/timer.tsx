import { useTimer } from '@/hooks/timer';
import { Button, Stack } from '@mui/material';

export const Timer = () => {
  const { time, startTime, resetTime, stopTime } = useTimer();
  console.log('コンポーネント time', time);

  return (
    <>
      <Stack>
        <Button onClick={startTime}>スタート</Button>
        <Button onClick={resetTime}>リセット</Button>
        <Button onClick={stopTime}>ストップ</Button>
        {time}
      </Stack>
    </>
  );
};
