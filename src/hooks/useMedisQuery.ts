// 参考 https://zenn.dev/nabeliwo/articles/89099b39223eca
import { useEffect, useState } from 'react';

export const mediaQuery = {
  sp: 'width < 752px',
  tablet: '752px <= width < 1122px',
  pc: '1122px <= width',
};

export const useMediaQuery = (query: string) => {
  const formattedQuery = `(${query})`;
  const mql = matchMedia(formattedQuery); // 同期的に情報を取れないからかコンソールでエラーが出るので直したい
  const [match, setMatch] = useState(mql.matches);

  useEffect(() => {
    if (mql.media === 'not all' || mql.media === 'invalid') {
      console.error(`useMediaQuery Error: Invalid media query`);
    }

    mql.onchange = (e) => {
      setMatch(e.matches);
    };

    return () => {
      mql.onchange = null;
    };
  }, [formattedQuery, setMatch]);

  return match;
};
