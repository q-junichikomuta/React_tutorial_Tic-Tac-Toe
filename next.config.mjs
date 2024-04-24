/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },

  // GitHub Pages は静的ファイルをホストするように設計されているため、
  // Next.js で静的ページ生成（HTML,CSS,JSなど）を有効にする。
  // https://zenn.dev/pino0701/articles/nextjs_github_pages
  // https://hackernoon.com/ja/nextjs-%E3%82%A2%E3%83%97%E3%83%AA%E3%82%92-github-%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AB%E5%85%AC%E9%96%8B%E3%81%99%E3%82%8B%E5%BF%85%E8%A6%81%E3%81%8C%E3%81%82%E3%82%8A%E3%81%BE%E3%81%99
  output: 'export',
};

export default nextConfig;
