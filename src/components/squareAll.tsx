import { Square } from './square';
import { PlayBoard } from '@/utils/styleComponents';
import { useCallback } from 'react';
import { useAtomValue, useSetAtom } from 'jotai';
import { boardSizeAtom } from '@/globalStates/boardSizeAtoms';
import { squareClickAtom } from '@/globalStates/gameStatusAtom';

/**
 * valueを反映させたsquareを生成
 */
export const SquareAll = () => {
  const boardSize = useAtomValue(boardSizeAtom);
  const squareClick = useSetAtom(squareClickAtom);

  const onClick = useCallback((i: number) => {
    squareClick(i);
  }, []);

  return (
    <PlayBoard repeat={boardSize}>
      {[...Array(boardSize * boardSize)].map((_, i) => (
        <Square
          key={`Square-${i}`} // 今回はindexでKeyを付けたが、ユニークIDなどがあればそれをつける
          onClick={onClick}
          num={i}
        />
      ))}
    </PlayBoard>
  );
};
