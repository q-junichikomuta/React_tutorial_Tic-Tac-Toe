// マス目に入るValueの定義
type Value = "X" | "O" | null;

type Positon = {
  row: number | null;
  col: number | null;
}

type History = {
  value: Value[];
  potision: Positon;
};

type ArrayValue = Array<Value>;

type PropSquare = {
  value: Value;
  onClick: () => void;
  winLine: number[] | null;
};

type PropBoard = {
  xIsNext: boolean;
  squares: Value[];
  onPlay: (nextSquares: Value[]) => void;
  squaresNum: number;
};
