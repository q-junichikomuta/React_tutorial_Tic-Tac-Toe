import { winLineGenerator } from '@/utils/winLineGenerator';
import { useCallback, useState } from 'react';

type Status = 'now' | 'winX' | 'winO' | 'draw';
type WinLine = number[] | null;
type Result = {
  status: Status;
  winLine: WinLine;
};

export const useGameStatus = (squares: Value[], oneSideNum: number, nextPlayer: boolean) => {
  const [result, setResult] = useState<Result>({
    status: 'now',
    winLine: null,
  });
  const winLines = winLineGenerator(oneSideNum);

  const squareValues = [...Array(winLines.length)].map((_, i) => {
    const winLine = winLines[i]; // [0, 1, 2]
    return winLine.map((u) => squares[u]);
  });

  // 勝利判定：一列のうちにnullが含まれておらず、全て同じ文字列であればtrueを返す
  const checkWin = (squareValue: Value[]) =>
    squareValue.includes(null) ? false : squareValue.every((val) => val === squareValue[0]);

  // 引分判定：一列のうち◯と☓の両方が含まれている
  const checkDraw = (squareValue: Value[]) => {
    const checkText = ['X', 'O'];
    const joined = squareValue.join('');

    // 複数の特定要素のうち全部(=XとOが)当てはまったら true を返す
    const isAllIncludes = (arr: string[], target: string) => arr.every((el) => target.includes(el));

    return isAllIncludes(checkText, joined);
  };

  const checkStatus = useCallback(() => {
    () => {
      // 先に全ての勝利配列の引分判定を調べる
      const draw = [...Array(winLines.length)].map((_, i) => {
        return checkDraw(squareValues[i]);
      });

      // 全ての勝利配列が引分判定（=XとOが含まれる）だったら、Statusをdrawにする
      if (draw.every((val) => val === true)) {
        setResult((prev) => ({
          ...prev,
          status: 'draw',
        }));
        return result;
      }

      // 勝利判定を調べる
      const win = [...Array(winLines.length)].map((_, i) => {
        return checkWin(squareValues[i]);
      });

      // 勝利した配列が存在していればStatusを勝者に更新する
      if (win.some((val) => val === true)) {
        const INDEX = win.findIndex((val) => val === true);
        setResult((prev) => ({
          ...prev,
          status: squareValues[INDEX][0] === 'X' ? 'winX' : 'winO',
        }));
        return result;
      }

      // 勝利でも引き分けでもなければゲーム続行
      // setStatus('now');
      // setResult((prev) => ({
      //   ...prev,
      //   status: 'now',
      // }));
      return result;
    };
  }, [squareValues]);

  const surrender = () => {
    setResult((prev) => ({
      ...prev,
      status: nextPlayer ? 'winO' : 'winX',
    }));
  };

  return { checkStatus, surrender };
};
