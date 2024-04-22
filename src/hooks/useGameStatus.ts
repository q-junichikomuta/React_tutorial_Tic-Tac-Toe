import { useCallback, useMemo, useState } from 'react';
import { useCountDownTimer } from './useCountDownTimer';
import { useAtomValue, useSetAtom } from 'jotai';
import { gameStatusAtom, squareValueWinLineAtom, winLinesAtom, wonLineAtom } from '@/globalStates/atoms';

// 現在のボードから、勝利配列に沿った配列を生成する
export const squareValuesGenerator = (value: Value[], winLines: number[][]) => {
  return [...Array(winLines.length)].map((_, i) => {
    const winLine = winLines[i];
    return winLine.map((u) => value[u]);
  });
};

// 勝利判定：一列のうちにnullが含まれておらず、全て同じ文字列であればtrueを返す
export const checkWin = (squareValue: Value[]) =>
  squareValue.includes(null) ? false : squareValue.every((val) => val === squareValue[0]);

// 引分判定：一列のうち◯と☓の両方が含まれている
export const checkDraw = (squareValue: Value[]) => {
  const checkText = ['X', 'O'];
  const joined = squareValue.join('');

  // 勝利配列の全てに引分判定が当てはまったら(=XとOが含まれていたら) true を返す
  const isAllIncludes = (arr: string[], target: string) => arr.every((el) => target.includes(el));

  return isAllIncludes(checkText, joined);
};

export const useGameStatus = () => {
  const { startTime } = useCountDownTimer();

  const setGameStatus = useSetAtom(gameStatusAtom);
  const setWonLine = useSetAtom(wonLineAtom); // 一列揃ったライン
  // const squaresValue = useAtomValue(squaresValueAtom);

  const squareValues = useAtomValue(squareValueWinLineAtom);
  console.log(squareValues);

  // ゲームモードに対する勝利配列を定義（縦,横,斜めのindexを格納した2次元配列）
  // 横[0,1,2]..., 縦[0,3,6]..., 斜め[0,4,8]...
  const winLines = useAtomValue(winLinesAtom);

  // const squareValues = useMemo(() => squareValuesGenerator(squaresValue, winLines), []);

  const checkStatus = useCallback(() => {
    // startTime();

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

      setGameStatus('win');
      setWonLine(winLines[INDEX]);
      return;
    }

    // 勝利でも引き分けでもなければゲーム続行
    setGameStatus('now');
    return;
  }, []);

  return { checkStatus };
};
