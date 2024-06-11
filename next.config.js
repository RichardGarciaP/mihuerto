const nextConfig = {
  env: {
    // un comment when you run in deploy
    // API_URL: "https://cuba-nextjs.vercel.app/api",
    //  comment when you run in local below down
    API_URL: "http://54.92.233.245:3005/v1/api",
  },
  redirects: async () => {
    return [
      { source: "/", destination: "/authentication/login", permanent: true },
    ];
  },
};

module.exports = nextConfig;
