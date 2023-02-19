import { DataSource, DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/db/migrations/*.js'],
  synchronize: false,
  dropSchema: false,
  migrationsTableName: 'migrations',
  logging: 'all',
  logger: 'file',
  // migrationsRun: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
