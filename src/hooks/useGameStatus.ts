import { winLineGenerator } from '@/utils/winLineGenerator';
import { useCallback, useMemo, useState } from 'react';
import { useCountDownTimer } from './useCountDownTimer';
import { useAtom } from 'jotai';
import { gameStatusAtom, gameTextDerivedAtom, oneSideNumAtom, wonLineAtom } from '@/app/globalStates/atoms';

export const useGameStatus = (nextPlayer: boolean) => {
  const [oneSideNum] = useAtom(oneSideNumAtom);
  const [, setGameStatus] = useAtom(gameStatusAtom);

  const [gameText, setGameText] = useAtom(gameTextDerivedAtom);

  const { startTime } = useCountDownTimer();

  // const [status, setStatus] = useState<Status>('before');
  const [wonLine, setWonLine] = useAtom<WonLine>(wonLineAtom); // 一列揃ったライン

  // ゲームモードに対する勝利配列を定義（縦,横,斜めのindexを格納した2次元配列）
  // 横[0,1,2]..., 縦[0,3,6]..., 斜め[0,4,8]...
  const winLines = useMemo(() => winLineGenerator(oneSideNum), [oneSideNum]);

  // 現在のボードから、勝利配列に沿った配列を生成する
  const squareValuesGenerator = useCallback(
    (value: Value[]) => {
      return [...Array(winLines.length)].map((_, i) => {
        const winLine = winLines[i];
        return winLine.map((u) => value[u]);
      });
    },
    [winLines]
  );

  // 勝利判定：一列のうちにnullが含まれておらず、全て同じ文字列であればtrueを返す
  const checkWin = useCallback(
    (squareValue: Value[]) => (squareValue.includes(null) ? false : squareValue.every((val) => val === squareValue[0])),
    []
  );

  // 引分判定：一列のうち◯と☓の両方が含まれている
  const checkDraw = useCallback((squareValue: Value[]) => {
    const checkText = ['X', 'O'];
    const joined = squareValue.join('');

    // 勝利配列の全てに引分判定が当てはまったら(=XとOが含まれていたら) true を返す
    const isAllIncludes = (arr: string[], target: string) => arr.every((el) => target.includes(el));

    return isAllIncludes(checkText, joined);
  }, []);

  const checkStatus = useCallback(
    (value: Value[]) => {
      startTime();
      const squareValues = squareValuesGenerator(value);

      // 先に全ての勝利配列の引分判定を調べる
      const draw = [...Array(winLines.length)].map((_, i) => {
        return checkDraw(squareValues[i]);
      });

      // 全ての勝利配列が引分判定（=XとOが含まれる）だったら、Statusをdrawにする
      if (draw.every((val) => val === true)) {
        setGameStatus('draw');
        return;
      }

      // 勝利判定を調べる
      const win = [...Array(winLines.length)].map((_, i) => {
        return checkWin(squareValues[i]);
      });

      // 勝利した配列が存在していればStatusを勝者に更新する
      if (win.some((val) => val === true)) {
        const INDEX = win.findIndex((val) => val === true);

        setGameStatus(squareValues[INDEX][0] === 'X' ? 'winX' : 'winO');
        setWonLine(winLines[INDEX]);
        return;
      }

      // 勝利でも引き分けでもなければゲーム続行
      setGameStatus('now');
      return;
    },
    [winLines, squareValuesGenerator]
  );

  // const surrender = useCallback(() => {
  //   setGameStatus(nextPlayer ? 'winO' : 'winX');
  // }, []);

  // // statusの状況によってTextを更新
  // useEffect(() => {
  //   if (status === 'before') {
  //     return;
  //   } else if (status === 'draw') {
  //     stopTime();
  //     text = '====引き分け====';
  //   } else if (status === 'winX' || status === 'winO' || TIMEUP) {
  //     stopTime();
  //     text = `${nextPlayer ? '勝者:O' : '勝者:X'}`;
  //   } else if (status === 'interval') {
  //     stopTime();
  //     text = '待機中・・・';
  //   } else {
  //     text = `${nextPlayer ? '次の手番:X' : '次の手番:O'}`;
  //   }
  // }, [status, nextPlayer, time, TIMEUP, stopTime]);

  return {
    // wonLine,
    // setWonLine,
    // time,
    // TIMEUP,
    checkStatus,
    // surrender,
  };
};
