module.exports = {
  apps: [
    {
      name: 'nuxt-admin',
      port: '3002',
      exec_mode: 'cluster',
      // instances: '3',
      script: './.output/server/index.mjs'
    }
  ]
}
