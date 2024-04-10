// 勝利に必要な配列を生成する関数
export const positionGenerator = (oneSideNum: number) => {
  const loopNum = [...Array(oneSideNum)]; // for文の代わりにループ回数を指定する空配列
  const alphabetIsRow = [...Array(26)].map((_, i) => String.fromCodePoint(i + 65)); // A, B, C...
  const numberIsColumn = [...Array(oneSideNum)].map((_, i) => i + 1); // 1, 2, 3...

  const position = loopNum.map((_, i) => {
    const row = alphabetIsRow[i];
    return numberIsColumn.map((column) => row + column);
  });

  return position.reduce((accumulator, currentValue) => {
    // concatメソッドを使って、2次元配列を1次元配列に変換
    return accumulator.concat(currentValue);
  }, []);
};
