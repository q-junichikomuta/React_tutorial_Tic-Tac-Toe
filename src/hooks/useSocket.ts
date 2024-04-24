import Message from '@/app/models/message';
import { messageBoardAtom, socketAtom } from '@/globalStates/socketAtoms';
import { useSetAtom } from 'jotai';
import { io } from 'socket.io-client';

export const useSocket = () => {
  // 各グローバル状態のAtomを用意
  const setMessageBoard = useSetAtom(messageBoardAtom);
  const setSocket = useSetAtom(socketAtom);

  const socketInitializer = (socket: any) => {
    // サーバーとの接続が確立したときの処理
    socket.on('connect', () => {
      console.log('Connected to the server');
    });

    // サーバーとの接続が切断されたときの処理
    socket.on('disconnect', () => {
      console.log('Disconnected from the server');
    });

    // サーバーからメッセージを受信したときの処理
    socket.on('message', (newMessage: Message) => {
      // グローバル状態のメッセージ一覧を更新
      setMessageBoard((messageBoard) => {
        // idが重複するメッセージを削除（一応の処理）
        const newMessageBoard = Array.from(new Map(messageBoard.map((message) => [message.id, message])).values());
        // 新しいメッセージを追加
        newMessageBoard.push(newMessage);
        return newMessageBoard;
      });
    });
  };

  /**
   * WebSocketに接続する関数
   */
  const socketConnect = async () => {
    // WebSocketサーバーに接続するにはまずHTTPサーバーに接続してWebSocketのエンドポイントを取得する必要がある
    await fetch('http://localhost:3000/api/sockets', { method: 'POST' });

    // WebSocketサーバーに接続
    const socket = io({ autoConnect: false });
    socket.connect();

    // WebSocketの各イベントに対する処理を定義
    socketInitializer(socket);

    // グローバル状態にソケットを保存
    setSocket(socket);
  };

  return { socketConnect };
};
