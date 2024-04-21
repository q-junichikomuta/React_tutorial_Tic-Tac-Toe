import { ChangeEvent, useCallback, useEffect, useState } from 'react';

/**
 * ダークモードを管理するカスタムフック
 */
export const useDarkMode = () => {
  // ダークモードの状態を管理するState
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDarkMode = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setIsDarkMode(event.target.checked);
  }, []);

  // OSのテーマに沿ってダークモードを決める
  const initialTheme = () => {
    // OSのテーマを読み込むメソッド
    const prefersColorSchemeDark = matchMedia('(prefers-color-scheme: dark)').matches;

    // ダークテーマに設定されていたらisDarkModeをtrueにする
    if (prefersColorSchemeDark) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  };

  // 初回読み込み時にOSのテーマを読み込む
  useEffect(() => {
    initialTheme();
  }, []);

  return { isDarkMode, handleDarkMode };
};
