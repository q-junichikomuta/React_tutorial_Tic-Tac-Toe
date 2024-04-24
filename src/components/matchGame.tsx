// 'use client';

// import React, { useState } from 'react';
// import Message from '@/app/models/message';
// import { messageBoardAtom, socketAtom } from '@/app/globalStates/atoms';
// import { Button, Stack } from '@mui/material';
// import { Square } from './square';
// import { BoardGrid } from '@/utils/styleComponents';
// import { useAtom } from 'jotai';
// import { useSocket } from '@/hooks/useSocket';

// // メッセージの入力と一覧を行うコンポーネント
// export function MatchGame() {
//   const oneSideNum = 3; // n目並べのn

//   const [isMatch, setIsMatch] = useState(false);
//   // 各グローバル状態のAtomを用意
//   const [messageBoard] = useAtom(messageBoardAtom);
//   const [socket] = useAtom(socketAtom);

//   const { socketConnect } = useSocket();

//   const matchStart = () => {
//     socketConnect();
//     setIsMatch(true);
//   };

//   const currentMove = messageBoard.length - 1;
//   const latestSquares = messageBoard[currentMove].squareValue as Value[];
//   const nextPlayer = currentMove % 2 === 0;
//   const playerName = nextPlayer ? 'X' : 'O';

//   // squareを選択した時の処理
//   const squareClick = (i: number) => {
//     if (!isMatch) {
//       return;
//     }

//     latestSquares[i] = playerName; // 選択したsquareのvalueを更新

//     // 送信するメッセージを作成
//     const sendMessage: Message = {
//       id: crypto.randomUUID(), // UUIDを生成して各メッセージに固有のIDを付与
//       squareValue: latestSquares as string[],
//     };

//     // サーバーにメッセージを送信
//     socket.emit('message', sendMessage);
//   };

//   const restart = () => {
//     const sendMessage: Message = {
//       id: crypto.randomUUID(), // UUIDを生成して各メッセージに固有のIDを付与
//       squareValue: [...Array(oneSideNum * oneSideNum).fill(null)],
//     };

//     // サーバーにメッセージを送信
//     socket.emit('message', sendMessage);
//   };

//   // valueを反映させたsquareを生成
//   const squareAll = [...Array(oneSideNum * oneSideNum)].map((_, i) => (
//     <Square
//       key={`Square-${i + 1}`} // 今回はindexでKeyを付けたが、ユニークIDなどがあればそれをつける
//       value={
//         messageBoard.length > 0 ? (messageBoard[messageBoard.length - 1].squareValue[i] as unknown as Value) : null
//       }
//       onClick={() => squareClick(i)}
//       winLine={false}
//     />
//   ));

//   // 生成したsquareをGridで正方形に整形
//   const PlayBoard = BoardGrid(oneSideNum);

//   return (
//     <>
//       <Stack spacing={2} direction={'column'} alignItems="center" justifyContent="center">
//         <div>{!isMatch ? `対戦開始ボタンを押してください` : `現在のプレイヤー：${playerName}`}</div>
//         <PlayBoard>{squareAll}</PlayBoard>
//         <Button onClick={matchStart} disabled={isMatch}>
//           {isMatch ? '対戦中' : '対戦開始'}
//         </Button>
//         <Button onClick={restart} color="error">
//           もう一度対戦する
//         </Button>
//       </Stack>
//     </>
//   );
// }
