// 勝利に必要な列を判定する関数
export const calculateWinLine = (num: number) => {
  // 勝利条件の列を格納する配列
  const winLine = [];

  // 横軸の勝利条件の列
  // →配列の中身が+1だけ違う
  for (let k = 0; k < num; k++) {
    const array = [];
    for (let i = k * num; array.length < num; i++) {
      array.push(i);
    }
    winLine.push(array);
  }

  // 縦軸の勝利条件の列
  // →配列の中身が+マス目分だけ違う
  for (let k = 0; k < num; k++) {
    const array = [];
    for (let i = k; array.length < num; i = i + num) {
      array.push(i);
    }
    winLine.push(array);
  }

  // 左上から右下の斜め軸の勝利条件の列
  // →配列の中身がマス目+1だけ違う
  for (let k = 0; k < 1; k++) {
    const array = [];
    for (let i = k; array.length < num; i = i + num + 1) {
      array.push(i);
    }
    winLine.push(array);
  }

  // 左下から右上の斜め軸の勝利条件の列
  // →開始を右上（マス目-1のインデックス）として、配列の中身がマス目-1だけ違う
  for (let k = 0; k < 1; k++) {
    const array = [];
    for (let i = k + num - 1; array.length < num; i = i + num - 1) {
      array.push(i);
    }
    winLine.push(array);
  }

  return winLine;
};

// 勝者もしくは引き分けを判定する関数
export const calculateWinner = (squares: Value[], num: number) => {
  // 勝利列のインデックスの配列
  // ex:[0,1,2],[3,4,5],[6,7,8],[0,3,6]...
  const lines = calculateWinLine(num);
  const lineAll: number[][] = [];
  const squareAll: Value[][] = [];

  console.log('lineAll', lineAll);
  console.log('squareAll', squareAll);

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
