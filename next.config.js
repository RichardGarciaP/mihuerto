const { createProxyMiddleware } = require('http-proxy-middleware');

const nextConfig = {
  env: {
    // Comentarios para distinguir entre entornos
    // API_URL: "https://cuba-nextjs.vercel.app/api", // Usar en producción
    API_URL: "http://54.92.233.245:3005/v1/api", // Usar en desarrollo local
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
        destination: process.env.API_URL + '/:path*'
      }
    ]
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