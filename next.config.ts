import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用静态导出
  output: 'export',
  
  // GitHub Pages 自定义域名部署时不需要 basePath，文件在根路径
  
  // 静态导出时禁用图片优化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
