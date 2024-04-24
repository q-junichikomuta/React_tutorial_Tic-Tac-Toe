// 参考 https://zenn.dev/nabeliwo/articles/89099b39223eca
import { useEffect, useRef, useState } from 'react';

/**
 * メディアの大きさを定義
 */
const mediaQuery = {
  sp: 'width < 752px',
  tablet: '752px <= width < 1122px',
  pc: '1122px <= width',
};

/**
 * メディアの大きさを判別するカスタムフック
 */
const useMediaQuery = (query: string) => {
  // 一度設定したメディアクエリは以降変更できない(=hooksの依存を考慮しなくて良い)
  const formattedQuery = useRef(`(${query})`);

  // mqlも同様、matchesの結果は監視すべきだが、mql自体はstateにする必要はない
  const mqlRef = useRef<null | MediaQueryList>(null);

  // メディアクエリに合致しているかは、mql.matchsを評価してからのため、初期化の段階では判断できない
  const [match, setMatch] = useState(false);

  useEffect(() => {
    // マウントのタイミングでmqlを生成
    mqlRef.current = window.matchMedia(formattedQuery.current);

    if (mqlRef.current.media === 'not all' || mqlRef.current.media === 'invalid') {
      console.error(`useMediaQuery Error: Invalid media query`);
    }

    // イベントの登録
    mqlRef.current.onchange = (e) => {
      setMatch(e.matches);
    };

    // 初期値をセット
    setMatch(mqlRef.current.matches);
  }, []);

  return match;
};

/**
 * useMediaQueryをラップして引数なしで呼び出すカスタムフック
 */
export const useNewMediaQuery = () => {
  const isSp = useMediaQuery(mediaQuery.sp);
  const isTablet = useMediaQuery(mediaQuery.tablet);
  const isPc = useMediaQuery(mediaQuery.pc);

  return { isSp, isTablet, isPc };
};
