import { createContext } from 'react';

// 全コンポーネントでダークモードおよびレスポンシブを管理したいので、useContextを使用
export const DarkModeContext = createContext(false);
export const ResponsiveContext = createContext(false);
