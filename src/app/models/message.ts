import { z } from 'zod';

// とりあえずZodを使ってアプリケーション内で
// やり取りするデータモデルを定義
// ※バリデーションルールは未定義です
const MessageSchemaDef = z.object({
  id: z.string(),
  squareValue: z.array(z.string()),
});

// Zodのデータモデルから型定義を生成
type Message = z.infer<typeof MessageSchemaDef>;
export default Message;
