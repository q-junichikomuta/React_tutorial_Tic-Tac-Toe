import { winLineGenerator } from './winLineGenerator';

// 勝者もしくは引き分けを判定する関数
export const calculateWinner = (squares: Value[], num: number) => {
  // 勝利列のインデックスの配列
  // ex:[0,1,2],[3,4,5],[6,7,8],[0,3,6]...
  const lines = winLineGenerator(num);

  // console.log('lines', lines);

  const lineAll: number[][] = [];
  const squareAll: Value[][] = [];

  // console.log('lineAll', lineAll);
  // console.log('squareAll', squareAll);

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    lineAll.push(lines[i]);

    // squaresからValueを取り出す
    const square: Value[] = [];
    for (let i = 0; i < line.length; i++) {
      square.push(squares[line[i]]);
    }
    squareAll.push(square);

    // 一列のうちにnullが含まれておらず、全て同じ文字列であればtrueを返す
    const checkWin = square.includes(null) ? false : square.every((val) => val === square[0]);

    if (checkWin) {
      return { winplayer: square[0], winLine: lines[i] };
    }
  }

  // 引き分けを求めるために、全ての列に◯と☓の両方が含まれていないか確認する
  const allCheckDraw: boolean[] = [];
  for (let i = 0; i < lineAll.length; i++) {
    // 後のincludesメソッドで識別できるように配列の中身をjoinメソッド文字列化する
    const joined = squareAll[i].join('');
    const checkText = ['X', 'O'];

    // 複数の特定要素のうち全部当てはまったら true を返す
    const isAllIncludes = (arr: string[], target: string) => arr.every((el) => target.includes(el));

    const checkDraw = isAllIncludes(checkText, joined);
    allCheckDraw.push(checkDraw);
  }
  console.log('allCheckDraw', allCheckDraw);

  if (allCheckDraw.every((val) => val === true)) {
    return { winplayer: 'Draw' };
  }

  return null;
};
