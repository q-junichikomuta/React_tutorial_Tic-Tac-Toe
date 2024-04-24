import { memo, useEffect } from 'react';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { timeUpAtom, timeAtom, timeCountDownEffectAtom } from '@/globalStates/timeAtoms';
import { gameTimeUpAtom } from '@/globalStates/gameStatusAtom';

export const TimeDisplay = () => {
  useAtom(timeCountDownEffectAtom); // カウントダウンのatomEffectを呼び出す
  const time = useAtomValue(timeAtom);
  const timeUp = useAtomValue(timeUpAtom);

  //timeUpになったらgameStatusを"timeup"に更新する関数をuseEffectで管理
  const gameTimeUp = useSetAtom(gameTimeUpAtom);
  useEffect(() => {
    gameTimeUp();
  }, [timeUp]);

  return <div>{timeUp ? '時間切れ' : `制限時間:${time}秒`}</div>;
};
