import { positionGenerator } from '@/utils/positionGenerator';
import { useCallback, useMemo, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  currentMoveAtom,
  gameStatusAtom,
  gameTextAtom,
  historyDerivedAtom,
  historyTextAtom,
  nextPlayerAtom,
  oneSideNumAtom,
  pageAtom,
  wonLineAtom,
} from '@/globalStates/atoms';
import { TIMEUPAtom, useCountDownTimer } from './useCountDownTimer';

export const useHistory = () => {
  const [oneSideNum] = useAtom(oneSideNumAtom);
  const [gameStatus, setGameStatus] = useAtom(gameStatusAtom);
  const [wonLine, setWonLine] = useAtom<WonLine>(wonLineAtom); // 一列揃ったライン
  const TIMEUP = useAtomValue(TIMEUPAtom);
  // const { TIMEUP } = useCountDownTimer();

  // 現在のターン数を管理するState
  const [currentMove, setCurrentMove] = useAtom(currentMoveAtom);

  // 現在のターン数が、奇数なら次の手番はPlayerO、偶数なら次の手番はPlayerX
  const [nextPlayer] = useAtom(nextPlayerAtom);

  // Historyのページネーションを管理するState
  const [page, setPage] = useAtom(pageAtom);

  // 現在のターン数を管理するState
  // const [currentMove, setCurrentMove] = useState(0);
  // // 現在のターン数が、奇数なら次の手番はPlayerO、偶数なら次の手番はPlayerX
  // const nextPlayer = currentMove % 2 === 0;

  // Historyを管理するState
  // const [history, setHistory] = useState<HistoryType[]>([
  //   {
  //     value: Array(oneSideNum * oneSideNum).fill(null),
  //     position: null,
  //   },
  // ]);

  const [history, setHistory] = useAtom(historyDerivedAtom);

  // Historyの状態をテキストで表示するためのState
  const [historyText] = useAtom(historyTextAtom);

  // ゲームの状態を管理するカスタムフックから必要な関数を呼び出す
  // const { checkStatus } = useGameStatus();

  // ゲーム進行とHistoryに合わせてHistoryのテキストを更新する関数
  // const historyTextUpdate = useCallback(
  //   (historyArray: HistoryType[], index: number) => {
  //     const move = historyArray?.map((u, i) => {
  //       const position = u.position || null;
  //       return {
  //         turn: i,
  //         player: i % 2 === 0 ? 'O' : 'X',
  //         position: position,
  //       };
  //     });

  //     const text = move[index];
  //     setHistoryText(`${text.turn}ターン目 | Pleyer：${text.player} | ${text.position}`);
  //   },
  //   [history]
  // );

  // Historyのページネーションを選択した時の処理
  // const pageUpdate = useCallback(
  //   (_event: unknown, pageNum: number) => {
  //     setCurrentMove(pageNum); // ゲームの状態を指定のターンまで戻す

  //     setGameStatus('interval'); // ゲーム進行を一時停止させる

  //     // pageNumがrestart用の0であれば別のテキストに置き換えて、pageはまだ戻れるようにそのままにする
  //     if (pageNum !== 0) {
  //       setPage(pageNum); // 現在のページを更新
  //       // historyTextUpdate(history, pageNum); // 指定のターン時のHistoryのテキストを表示
  //     }
  //     //  else {
  //     //   setHistoryText('はじめからプレイ');
  //     // }

  //     // 勝利が決まっていた場合は勝利ラインをリセットする
  //     if (wonLine) {
  //       setWonLine(null);
  //     }
  //   },
  //   [history, wonLine]
  // );

  // はじめからプレイするための関数
  // const restart = useCallback((e: unknown) => {
  //   setWonLine(null);
  //   pageUpdate(e, 0);
  // }, []);

  // 横をアルファベット,縦を数字として座標を生成する
  // const position = useMemo(() => positionGenerator(oneSideNum), [oneSideNum]);

  // // squareを選択した時の処理
  // const squareClick = useCallback(
  //   (i: number) => {
  //     // 勝利か引分か時間切れならゲームの進行を止める
  //     if (gameStatus === 'win' || gameStatus === 'draw' || TIMEUP) {
  //       return;
  //     }

  //     // 現在のボードの状態
  //     const currentSquares = history[currentMove]; // valueとposition
  //     const squaresValue = currentSquares.value; // valueのみ
  //     setHistory(i); // Historyを更新する
  //     // 勝利、引分、継続の判定を行う
  //     // checkStatus();
  //   },
  //   [gameStatus, TIMEUP, history, oneSideNum]
  // );

  return {
    history,
    wonLine,
    page,
    historyText,
    nextPlayer,
    // squareClick,
    // pageUpdate,
    // restart,
  };
};
