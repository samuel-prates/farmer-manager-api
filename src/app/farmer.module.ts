import { Module } from '@nestjs/common';
import { FarmerService } from './domain/service/farmer.service';
import { FarmerController } from '../entrypoint/controller/farmer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from 'src/infra/database/entities/farmer.entity';
import { Farm } from 'src/infra/database/entities/farm.entity';
import { Harvest } from 'src/infra/database/entities/harvest.entity';
import { FarmService } from './domain/service/farm.service';
import { HarvestService } from './domain/service/harvest.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Farmer, Farm, Harvest])
  ],
  controllers: [FarmerController],
  providers: [FarmerService, FarmService, HarvestService],
})
export class FarmerModule { }
