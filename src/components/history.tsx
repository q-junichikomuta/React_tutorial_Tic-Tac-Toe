import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Pagination, Radio, Stack } from '@mui/material';
import { useState } from 'react';

// type Row = {
//   turn: number;
//   player: string;
//   position: string | null;
// };

type Props = {
  historyText: string;
  page: number;
  pageUpdate: (_event: React.ChangeEvent<unknown>, value: number) => void;
  historyLength: number;
};

export const History = ({ historyText, historyLength, page, pageUpdate }: Props) => {
  return (
    <Stack spacing={1}>
      <Box component="section" sx={{ p: 2, border: '1px dashed grey' }}>
        {historyText}
      </Box>
      <Pagination color="primary" count={historyLength} disabled={page === 0} page={page} onChange={pageUpdate} />
    </Stack>
  );
};

//   const onClick = (selectId: number) => {
//     pageUpdate(selectId);
//     jampTo(selectId);
//     setSlected(selectId);
//   };

// <TableContainer component={Paper}>
//   <Table aria-label="history table">
//     <TableHead>
//       <TableRow>
//         <TableCell>{/* Radio Button */}</TableCell>
//         <TableCell>Turn</TableCell>
//         <TableCell>Player</TableCell>
//         <TableCell>Position</TableCell>
//       </TableRow>
//     </TableHead>
//     <TableBody>
//       {rows?.map((row, i) => (
//         <TableRow key={`${row.turn}-${row.player}`} onClick={() => onClick(i)}>
//           <TableCell>
//             <Radio checked={selected === i} />
//           </TableCell>
//           <TableCell>{row.turn}</TableCell>
//           <TableCell>{row.player}</TableCell>
//           <TableCell>{row.position}</TableCell>
//         </TableRow>
//       ))}
//     </TableBody>
//   </Table>
// </TableContainer>
