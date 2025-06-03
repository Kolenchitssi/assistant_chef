import type { NextConfig } from 'next';
import path from 'node:path';

const nextConfig: NextConfig = {
  // pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'], // if we used mdx
  /* config options here */
  sassOptions: {
    implementation: 'sass-embedded',
    additionalData: `@use "${path.join(process.cwd(), '_mantine').replace(/\\/g, '/')}" as mantine;`,
  },
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
  },
};

export default nextConfig;
