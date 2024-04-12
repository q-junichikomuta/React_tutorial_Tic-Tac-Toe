import { Button, Stack } from '@mui/material';
import { History } from './history';
import { Square } from './square';
import { BoardGrid } from '@/utils/styleComponents';
import { mediaQuery, useMediaQuery } from '@/hooks/useMedisQuery';
import { useHistory } from '@/hooks/useHistory';

export const Game = ({ oneSideNum }: { oneSideNum: number }) => {
  const {
    text,
    time,
    history,
    wonLine,
    surrender,
    page,
    historyText,
    squaresValue,
    squareClick,
    pageUpdate,
    restart,
    TIMEUP,
  } = useHistory(oneSideNum);

  // レスポンシブを取得
  const isSp = useMediaQuery(mediaQuery.sp);

  // valueを反映させたsquareを生成
  const squareAll = [...Array(oneSideNum * oneSideNum)].map((_, i) => (
    <Square
      key={`Square-${i + 1}`} // 今回はindexでKeyを付けたが、ユニークIDなどがあればそれをつける
      value={squaresValue[i]}
      onClick={() => squareClick(i)}
      winLine={wonLine?.includes(i) ? true : false}
    />
  ));

  // 生成したsquareをGridで正方形の形に整形
  const PlayBoard = BoardGrid(oneSideNum);

  return (
    <Stack spacing={2} direction={isSp ? 'column' : 'row'} alignItems="center" justifyContent="center">
      <Stack>
        <div>{text}</div>
        <div>{TIMEUP ? '時間切れ' : `制限時間:${time}秒`}</div>
        <PlayBoard>{squareAll}</PlayBoard>
        <Button variant="contained" size="small" color="error" onClick={surrender}>
          投了
        </Button>
      </Stack>
      <History
        text={historyText}
        historyLength={history.length - 1}
        page={page}
        pageUpdate={pageUpdate}
        restart={restart}
      />
    </Stack>
  );
};
