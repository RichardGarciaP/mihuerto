const nextConfig = {
  env: {
    // un comment when you run in deploy
    // API_URL: "https://cuba-nextjs.vercel.app/api",
    //  comment when you run in local below down
    API_URL: "https://mihuerto-api-10d6db223156.herokuapp.com/v1/api",
  },
  redirects: async () => {
    return [
      { source: "/", destination: "/authentication/login", permanent: true },
    ];
  },
};

module.exports = nextConfig;
