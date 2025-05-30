import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { FarmerModule } from './app/farmer.module';
import { Farmer } from './infra/database/entities/farmer.entity';
import { Farm } from './infra/database/entities/farm.entity';
import { Harvest } from './infra/database/entities/harvest.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'farmsdb',
      synchronize: process.env.DB_SYNCHRONIZE === 'true', // Set to false in production!
      autoLoadEntities: true,
      logging: process.env.DB_LOGGING === 'true',
      entities: [Farmer, Farm, Harvest],
    }),
    CacheModule.register({
      ttl: 300, // 5 minutes in seconds
      isGlobal: true,
    }),
    FarmerModule,
  ],
})

export class AppModule {}
