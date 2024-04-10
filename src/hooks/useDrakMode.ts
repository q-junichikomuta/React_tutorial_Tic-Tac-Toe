import { ChangeEvent, useCallback, useEffect, useState } from 'react';

export const useDarkMode = () => {
  // ダークモードの状態を管理するState
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleDrakMode = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setIsDarkMode(event.target.checked);
    },
    [isDarkMode]
  );

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

  return { isDarkMode, handleDrakMode };
};
