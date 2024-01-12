import * as dotenv from 'dotenv';
import { DataSource } from 'typeorm';
import * as migrations from './migrations';

dotenv.config();

export default new DataSource({
  logging: true,
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  migrations: Object.values(migrations),
  migrationsTableName: 'migrations',
});
