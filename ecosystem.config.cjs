module.exports = {
  apps: [
    {
      name: 'NuxtAppName',
      port: '4001',
      exec_mode: 'cluster',
      instances: '3',
      script: './.output/server/index.mjs'
    }
  ]
}
