import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Radio } from '@mui/material';
import { useState } from 'react';

type Row = {
  turn: number;
  player: string;
  position: string | null;
};

type Props = {
  rows: Row[];
  jampTo: (nextMove: number) => void;
};

export const History = ({ rows, jampTo }: Props) => {
  const [selected, setSlected] = useState(0);

  const onClick = (selectId: number) => {
    jampTo(selectId);
    setSlected(selectId);
  };

  return (
    <TableContainer component={Paper}>
      <Table aria-label="history table">
        <TableHead>
          <TableRow>
            <TableCell>{/* Radio Button */}</TableCell>
            <TableCell>Turn</TableCell>
            <TableCell>Player</TableCell>
            <TableCell>Position</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.map((row, i) => (
            <TableRow key={`${row.turn}-${row.player}`} onClick={() => onClick(i)}>
              <TableCell>
                <Radio checked={selected === i} />
              </TableCell>
              <TableCell>{row.turn}</TableCell>
              <TableCell>{row.player}</TableCell>
              <TableCell>{row.position}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
