import { atom } from 'jotai';
import { Socket } from 'socket.io-client';
import Message from '@/app/models/message';

//　グローバルな状態を管理するためのatomを定義
//  atomはjotaiの機能で、状態を管理するためのもの

// 状態：WebSocketコネクション
export const socketAtom = atom(null as unknown as Socket);
// 状態：メッセージ一覧
export const messageBoardAtom = atom<Array<Message>>([
  {
    id: crypto.randomUUID(), // UUIDを生成して各メッセージに固有のIDを付与
    squareValue: Array(0),
  },
]);
// 状態：ユーザー名
export const userNameAtom = atom('');
