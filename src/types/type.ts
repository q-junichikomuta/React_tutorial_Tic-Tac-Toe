// マス目に入るValueの定義s
type Value = 'X' | 'O' | null;

type Position = string | null;

type HistoryType = {
  value: Value[];
  position: string | null;
};
