const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "3005",
      },
    ],
  },
  env: {
    // un comment when you run in deploy
    // API_URL: "https://cuba-nextjs.vercel.app/api",
    //  comment when you run in local below down
    API_URL: "http://localhost:3005/v1/api",
    SERVER_URL: "http://localhost:3005/",
  },
  redirects: async () => {
    return [
      { source: "/", destination: "/authentication/login", permanent: true },
    ];
  },
};

module.exports = nextConfig;
