import type { NextConfig } from 'next';

const config: NextConfig = {
  transpilePackages: ['@prismojs/react', 'three'],
};

export default config;
