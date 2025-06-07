import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const host =
          process.env.NODE_ENV === 'development'
            ? 'localhost'
            : configService.get('POSTGRES_HOST');

        return {
          type: 'postgres',
          host,
          port: parseInt(configService.get('POSTGRES_PORT'), 10),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: false,
          logging: true,
          autoLoadEntities: true,
          migrations: [__dirname + '/../migrations/*{.ts,.js}'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}
