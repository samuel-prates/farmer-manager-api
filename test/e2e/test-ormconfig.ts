import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Farmer } from 'src/infra/database/entities/farmer.entity';
import { Farm } from 'src/infra/database/entities/farm.entity';
import { Harvest } from 'src/infra/database/entities/harvest.entity';

export const testOrmConfig: TypeOrmModuleOptions = {
  type: 'sqlite',
  database: ':memory:',
  dropSchema: true,
  entities: [Farmer, Farm, Harvest],
  synchronize: true,
  logging: false,
};