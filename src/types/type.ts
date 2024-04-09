// マス目に入るValueの定義s
type Value = 'X' | 'O' | null;

type Position = string | null;
// {
//   row: number | null;
//   col: number | null;
// };

type HistoryType = {
  value: Value[];
  position: string | null;
};

type ArrayValue = Array<Value>;

type PropSquare = {
  value: Value;
  onClick: () => void;
  winLine: boolean;
};

type PropBoard = {
  nextPlayer: boolean;
  squares: Value[];
  onPlay: (nextSquares: Value[], position: Position) => void;
  oneSideNum: number;
};
