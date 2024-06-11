const { createProxyMiddleware } = require('http-proxy-middleware');

const nextConfig = {
  env: {
    // Descomentar esta línea y comentar la otra para producción
    // API_URL: "https://cuba-nextjs.vercel.app/api",
    // Comentar esta línea y descomentar la otra para desarrollo local
    API_URL: "http://54.92.233.245:3005/v1/api",
  },
  redirects: async () => {
    return [
      { source: "/", destination: "/authentication/login", permanent: true },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `http://54.92.233.245:3005/v1/api/:path*`,
      }
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.devServer = config.devServer || {};
      config.devServer.proxy = {
        '/api': {
          target: process.env.API_URL,
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        }
      };
    }
    return config;
  }
};

module.exports = nextConfig;
