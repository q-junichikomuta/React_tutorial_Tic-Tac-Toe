import { MouseEventHandler } from 'react';
import { Box, Button, Pagination, Stack } from '@mui/material';

type Props = {
  historyText: string;
  page: number;
  pageUpdate: (_event: React.ChangeEvent<unknown>, value: number) => void;
  historyLength: number;
  restart: MouseEventHandler<HTMLButtonElement>;
};

export const History = ({ historyText, historyLength, page, pageUpdate, restart }: Props) => {
  return (
    <Stack spacing={1} justifyContent="center" alignContent="center">
      <Box
        component="section"
        sx={{ width: 300, p: 2, border: '1px dashed grey' }}
        textAlign="center"
        justifyContent="center"
      >
        {historyText}
      </Box>
      <Pagination
        color="primary"
        sx={{ width: 300 }}
        count={historyLength}
        disabled={page === 0}
        page={page}
        onChange={pageUpdate}
        siblingCount={0}
        boundaryCount={1}
      />
      <Button variant="outlined" color="primary" onClick={restart}>
        はじめから
      </Button>
    </Stack>
  );
};
