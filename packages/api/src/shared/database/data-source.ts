import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';

// eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
export function createDataSource(entities: Function[], schema?: string): DataSource {
  const options: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_DATABASE || 'db_jungle',
    schema: schema || 'public',
    entities,
    migrations: [join(__dirname, '../../**/migrations/*{.ts,.js}')],
    synchronize: false,
    logging: false,
  };

  return new DataSource(options);
}
