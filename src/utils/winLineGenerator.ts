// 勝利に必要な配列を生成する関数
export const winLineGenerator = (oneSideNum: number) => {
  const defaultNum = oneSideNum; // n目並べのn
  const templateArray = [...Array(defaultNum * defaultNum)].map((u, i) => i); // n目並べのマス数の連番配列

  // n目並べの横ラインの勝利配列
  // →配列の中身が"+1"だけ違う
  const filterWinLineRow = (array: number[], number: number) => {
    return [...Array(number)].map((_, i) => array.filter((u) => number * i <= u && u <= number * i + number - 1));
  };

  // n目並べの縦ラインの勝利配列
  // →配列の中身が"マス目"だけ違う
  const filterWinLineColumn = (array: number[], number: number) => {
    return [...Array(number)].map((_, i) => array.filter((u) => u % number === i));
  };

  // n目並べのバックスラッシュ（＼）ラインの勝利配列
  // →配列の中身が"マス目+1"だけ違う
  const filterWinLineBackslash = (array: number[], number: number) => {
    return array.filter((u) => u % (number + 1) === 0);
  };

  // n目並べのスラッシュ（／）ラインの勝利配列
  // →開始を右上（マス目-1のインデックス）として、配列の中身が"マス目-1"だけ違う
  const filterWinLineSlash = (array: number[], number: number) => {
    return array.filter((u) => u % (number - 1) === 0 && number - 1 <= u && u <= number * (number - 1));
  };

  const winLineRow = filterWinLineRow(templateArray, defaultNum);
  const winLineColumn = filterWinLineColumn(templateArray, defaultNum);
  const winLineBacklash = filterWinLineBackslash(templateArray, defaultNum);
  const winLineSlash = filterWinLineSlash(templateArray, defaultNum);

  return [...winLineRow, ...winLineColumn, winLineBacklash, winLineSlash];
};
