import env from '#start/env'
import { defineConfig } from '@adonisjs/lucid'

const dbConfig = defineConfig({
  connection: 'postgres',
  connections: {
    postgres: {
      client: 'pg',
      connection: {
        host: env.get('DB_HOST'),
        port: env.get('DB_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('DB_DATABASE'),
      },
      migrations: {
        /**
         * * @todo not allow rollback on production is a must, save for later
         */
        disableRollbacksInProduction: true,
        naturalSort: true,
        paths: ['database/migrations'],
      },
    },
  },
})

export default dbConfig
