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
