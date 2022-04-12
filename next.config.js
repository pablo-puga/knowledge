/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        version: process.env.npm_package_version,
    },
};

if (process.env.APP_ENV === 'profile') {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const withBundleAnalyzer = require('@next/bundle-analyzer')({});
    module.exports = withBundleAnalyzer(nextConfig);
} else {
    module.exports = nextConfig;
}
