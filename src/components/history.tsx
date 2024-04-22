import { MouseEventHandler, memo, useCallback } from 'react';
import { Box, Button, Pagination, Stack } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';
import {
  historyLengthAtom,
  historyTextAtom,
  oneSideNumChangeAtom,
  pageAtom,
  updatePageAtom,
} from '@/globalStates/atoms';

// type Props = {
//   text: string;
//   page: number;
//   // pageUpdate: (_event: React.ChangeEvent<unknown>, value: number) => void;
//   historyLength: number;
//   // restart: MouseEventHandler<HTMLButtonElement>;
// };

const TextBox = memo(() => {
  const historyText = useAtomValue(historyTextAtom);
  console.log('Boxだよ');

  return (
    <Box
      component="section"
      sx={{ width: 300, p: 2, border: '1px dashed grey' }}
      textAlign="center"
      justifyContent="center"
    >
      {historyText}
    </Box>
  );
});

const RestartButton = memo(() => {
  const updatePage = useSetAtom(updatePageAtom);

  const restart = useCallback(() => {
    updatePage(0);
  }, []);

  return (
    <Button variant="outlined" color="primary" onClick={restart}>
      はじめから
    </Button>
  );
});

export const History = memo(() => {
  const historyLength = useAtomValue(historyLengthAtom);
  const page = useAtomValue(pageAtom);

  const updatePage = useSetAtom(updatePageAtom);

  const update = useCallback((_event: unknown, pageNum: number) => {
    updatePage(pageNum);
  }, []);

  console.log('ヒストリーだよ');

  return (
    <Stack spacing={1} justifyContent="center" alignContent="center">
      <TextBox />
      <Pagination
        color="primary"
        sx={{ width: 300 }}
        count={historyLength}
        disabled={page === 0}
        page={page}
        onChange={update}
        siblingCount={0}
        boundaryCount={1}
      />
      <RestartButton />
    </Stack>
  );
});
