// マス目に入るValueの定義s
type Value = 'X' | 'O' | null;

type Position = string | null;

type HistoryType = {
  value: Value[];
  position: string | null;
};

type Status = 'before' | 'interval' | 'now' | 'winX' | 'winO' | 'draw';

type WonLine = number[] | null;
