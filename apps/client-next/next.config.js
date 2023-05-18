//@ts-check

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withNx } = require('@nrwl/next/plugins/with-nx');

/**
 * @type {import('@nrwl/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  nx: {
    // Set this to true if you would like to use SVGR
    // See: https://github.com/gregberge/svgr
    svgr: false,
  },

  reactStrictMode: false,
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        port: '',
        pathname: '/media/**',
      },
      {
        hostname: 'flagcdn.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

module.exports = withNx(nextConfig);