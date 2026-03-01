/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        optimizePackageImports: ['framer-motion'],
    },
    transpilePackages: ['three'],
};

export default nextConfig;
