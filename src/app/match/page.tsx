'use client';
import { MatchGame } from '@/components/matchGame';
import { Suspense } from 'react';

// メッセージの入力と一覧を行うページコンポーネント
export default function Rooms() {
  return (
    <Suspense fallback="loading...">
      <MatchGame />
    </Suspense>
  );
}
