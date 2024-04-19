import { Button, Stack } from '@mui/material';
import { History } from './history';
import { Square } from './square';
import { PlayBoard } from '@/utils/styleComponents';
import { mediaQuery, useMediaQuery } from '@/hooks/useMediaQuery';
import { useHistory } from '@/hooks/useHistory';
import { MouseEventHandler, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { useNewMediaQuery } from '@/hooks/useNewMediaQuery';
import { useAtom } from 'jotai';
import {
  currentMoveAtom,
  gameTextDerivedAtom,
  historyDerivedAtom,
  historyTextDerivedAtom,
  nextPlayerAtom,
  oneSideNumAtom,
  wonLineAtom,
} from '@/app/globalStates/atoms';
import { useCountDownTimer } from '@/hooks/useCountDownTimer';

type Props = {
  oneSideNum: number;
  squaresValue?: Value[];
  squareClick: (i: number) => void;
  wonLine: WonLine;
};

// valueを反映させたsquareを生成
const SquareAll = memo(({ oneSideNum, squaresValue, squareClick, wonLine }: Props) => {
  const click = useMemo(() => squareClick, []);
  return [...Array(oneSideNum * oneSideNum)].map((_, i) => (
    <Square
      key={`Square-${i + 1}`} // 今回はindexでKeyを付けたが、ユニークIDなどがあればそれをつける
      value={squaresValue && squaresValue[i]}
      // メモ化しないとtimeなどが更新されるたびに新しい関数がセットされて全て再レンダリングされてしまう
      // 見た目の変化が必要なValueと、時間が切れたら押せない関数としてセットするためにTIMEUPを依存関係にする
      onClick={click}
      wonLine={wonLine?.includes(i) ? true : false}
      num={i}
    />
  ));
});

const SurrenderButton = memo(() => {
  const [nextPlayer] = useAtom(nextPlayerAtom);
  const [gameText, setGameText] = useAtom(gameTextDerivedAtom);

  console.log(nextPlayer, gameText);

  const onClick = useCallback(() => {
    setGameText(nextPlayer ? 'winO' : 'winX');
  }, [nextPlayer]);

  return (
    <Button variant="contained" size="small" color="error" onClick={onClick}>
      投了
    </Button>
  );
});

export const Game = memo(() => {
  const [oneSideNum] = useAtom(oneSideNumAtom);
  const [wonLine, setWonLine] = useAtom<WonLine>(wonLineAtom); // 一列揃ったライン
  const [gameText, setGameText] = useAtom(gameTextDerivedAtom);

  // 現在のターン数を管理するState
  const [currentMove, setCurrentMove] = useAtom(currentMoveAtom);
  const [history, setHistory] = useAtom(historyDerivedAtom);
  console.log('history', history);

  // Historyの状態をテキストで表示するためのState
  const [historyText, setHistoryText] = useAtom(historyTextDerivedAtom);
  const { time, TIMEUP } = useCountDownTimer();

  const currentSquares = history[currentMove]; // valueとposition

  const squaresValue = currentSquares?.value; // valueのみ

  const { page, squareClick, pageUpdate, restart } = useHistory();

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
        <div>{gameText}</div>
        <div>{TIMEUP ? '時間切れ' : `制限時間:${time}秒`}</div>
        <PlayBoard repeat={oneSideNum}>
          <SquareAll oneSideNum={oneSideNum} squaresValue={squaresValue} squareClick={squareClick} wonLine={wonLine} />
        </PlayBoard>
        <SurrenderButton />
        {/* <div>{gameStatus}</div> */}
      </Stack>
      <History text={historyText} historyLength={hisroryLength} page={page} pageUpdate={pageUpdate} restart={restart} />
    </Stack>
  );
});
