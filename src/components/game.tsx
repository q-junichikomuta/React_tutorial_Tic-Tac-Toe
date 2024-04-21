import { Button, Stack } from '@mui/material';
import { History } from './history';
import { Square } from './square';
import { PlayBoard } from '@/utils/styleComponents';
import { mediaQuery, useMediaQuery } from '@/hooks/useMediaQuery';
import { useHistory } from '@/hooks/useHistory';
import { MouseEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNewMediaQuery } from '@/hooks/useNewMediaQuery';

const MyButton = memo(({ onClick }: { onClick: MouseEventHandler<HTMLButtonElement> }) => {
  console.log('bottondayo-');

  return (
    <Button variant="contained" size="small" color="error" onClick={onClick}>
      投了
    </Button>
  );
});

type Props = {
  oneSideNum: number;
  squaresValue: Value[];
  squareClick: (i: number) => void;
  wonLine: WonLine;
  // TIMEUP: boolean;
};

// valueを反映させたsquareを生成
const SquareAll = memo(({ oneSideNum, squaresValue, squareClick, wonLine }: Props) => {
  return [...Array(oneSideNum * oneSideNum)].map((_, i) => (
    <Square
      key={`Square-${i + 1}`} // 今回はindexでKeyを付けたが、ユニークIDなどがあればそれをつける
      value={squaresValue[i]}
      // メモ化しないとtimeなどが更新されるたびに新しい関数がセットされて全て再レンダリングされてしまう
      // 見た目の変化が必要なValueと、時間が切れたら押せない関数としてセットするためにTIMEUPを依存関係にする
      onClick={() => squareClick(i)}
      wonLine={wonLine?.includes(i) ? true : false}
    />
  ));
});

export const Game = memo(({ oneSideNum }: { oneSideNum: number }) => {
  const [text, setText] = useState(`${oneSideNum}目並べで勝負！`);

  const {
    status,
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
    nextPlayer,
  } = useHistory(oneSideNum);

  // レスポンシブを取得
  const { isSp } = useNewMediaQuery();

  // valueを反映させたsquareを生成
  // const squareAll = [...Array(oneSideNum * oneSideNum)].map((_, i) => (
  //   <Square
  //     key={`Square-${i + 1}`} // 今回はindexでKeyを付けたが、ユニークIDなどがあればそれをつける
  //     value={squaresValue[i]}
  //     // メモ化しないとtimeなどが更新されるたびに新しい関数がセットされて全て再レンダリングされてしまう
  //     // 見た目の変化が必要なValueと、時間が切れたら押せない関数としてセットするためにTIMEUPを依存関係にする
  //     onClick={() => squareClick(i)}
  //     wonLine={wonLine?.includes(i) ? true : false}
  //   />
  // ));

  // 不必要に再計算されないようにメモ化
  const hisroryLength = useMemo(() => history.length - 1, [history]);

  return (
    <Stack spacing={2} direction={isSp ? 'column' : 'row'} alignItems="center" justifyContent="center">
      <Stack>
        <div>{text}</div>
        <div>{TIMEUP ? '時間切れ' : `制限時間:${time}秒`}</div>

        <PlayBoard repeat={oneSideNum}>
          {/* {squareAll} */}
          <SquareAll oneSideNum={oneSideNum} squaresValue={squaresValue} squareClick={squareClick} wonLine={wonLine} />
        </PlayBoard>
        <MyButton onClick={surrender} />
      </Stack>
      <History text={historyText} historyLength={hisroryLength} page={page} pageUpdate={pageUpdate} restart={restart} />
    </Stack>
  );
});
