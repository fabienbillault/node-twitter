module.exports = {
  apps: [
    {
      name: 'Twitter-app',
      script: './bin/www',
      instances: 'max',
      autorestart: true,
      watch: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
