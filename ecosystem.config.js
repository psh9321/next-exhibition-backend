module.exports = {
  apps: [
    {
      name: "nest-mongoose-exhibition-server",
      script: "dist/main.js",
      cwd: "/usr/share/nginx/next-exhibition-backend",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
