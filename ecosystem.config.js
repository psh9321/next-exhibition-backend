module.exports = {
  apps: [
    {
      name: "nest-mongoose-exhibition-server",
      script: "dist/main.js",
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
