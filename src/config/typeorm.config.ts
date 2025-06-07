import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { config } from 'dotenv';

config();

const configService = new ConfigService();

const host =
  process.env.NODE_ENV === 'development'
    ? 'localhost'
    : configService.get('POSTGRES_HOST');

export default new DataSource({
  type: 'postgres',
  host,
  port: parseInt(configService.get('POSTGRES_PORT'), 10),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: [join(__dirname, '../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../migrations/*{.ts,.js}')],
  synchronize: false,
});
