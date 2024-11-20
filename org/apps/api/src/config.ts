import convict from 'convict';
import { config as dotenv } from 'dotenv';

dotenv();

export const config = convict({
  db: {
    host: {
      doc: 'DB host',
      format: String,
      default: '127.0.0.1',
      env: 'PTJ_DB_HOST',
    },
    name: {
      doc: 'DB name',
      format: String,
      default: 'part-time-jobs',
      env: 'PTJ_DB_NAME',
    },
    schema: {
      doc: 'DB schema',
      format: ['mongodb'],
      default: 'mongodb',
      env: 'PTJ_DB_SCHEMA',
    },
  },
  authentication: {
    secret: {
      doc: 'JWT secret',
      format: String,
      default: undefined,
      env: 'PTJ_JWT_SECRET',
    },
  },
  server: {
    port: {
      doc: 'Server port',
      format: Number,
      default: 3000,
      env: 'PTJ_SERVER_PORT',
    },
  },
});
