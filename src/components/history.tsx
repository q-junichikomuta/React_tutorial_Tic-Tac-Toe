import { memo, useCallback } from 'react';
import { Box, Button, Pagination, Stack } from '@mui/material';
import { useAtomValue, useSetAtom } from 'jotai';

import { historyLengthAtom, historyTextAtom } from '@/globalStates/historyAtoms';
import { pageAtom, updatePageAtom } from '@/globalStates/pageAtoms';

const TextBox = memo(() => {
  const historyText = useAtomValue(historyTextAtom);
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

const Pages = memo(() => {
  const historyLength = useAtomValue(historyLengthAtom);
  const page = useAtomValue(pageAtom);
  const updatePage = useSetAtom(updatePageAtom);

  const update = useCallback((_event: unknown, pageNum: number) => {
    updatePage(pageNum);
  }, []);

  return (
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
  return (
    <Stack spacing={1} justifyContent="center" alignContent="center">
      <TextBox />
      <Pages />
      <RestartButton />
    </Stack>
  );
});
