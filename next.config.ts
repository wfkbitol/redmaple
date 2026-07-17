import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 启用静态导出
  output: 'export',
  
  // GitHub Pages 部署时需要（替换为你的仓库名）
  basePath: '/redmaple',
  
  // 静态导出时禁用图片优化
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
