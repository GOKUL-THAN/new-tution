// PM2 Ecosystem Config — Global Minds Academy
// Usage:
//   Start:   pm2 start ecosystem.config.js
//   Reload:  pm2 reload global-minds
//   Stop:    pm2 stop global-minds
//   Logs:    pm2 logs global-minds
//   Monitor: pm2 monit

module.exports = {
  apps: [
    {
      name: 'global-minds',
      script: 'node_modules/.bin/next',
      args: 'start',
      cwd: 'd:\\new tution website',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production',
        PORT: 3000,
      },
      error_file: 'logs/pm2-error.log',
      out_file: 'logs/pm2-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      restart_delay: 3000,
      max_restarts: 10,
    },
  ],
};
