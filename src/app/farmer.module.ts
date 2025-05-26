import { Module } from '@nestjs/common';
import { FarmerService } from './domain/service/farmer.service';
import { FarmerController } from '../entrypoint/controller/farmer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from 'src/infra/database/entities/farmer.entity';
import { Farm } from 'src/infra/database/entities/farm.entity';
import { Harvest } from 'src/infra/database/entities/harvest.entity';
import { FarmService } from './domain/service/farm.service';
import { HarvestService } from './domain/service/harvest.service';
import { DashboardController } from 'src/entrypoint/controller/dashboard.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Farmer, Farm, Harvest])
  ],
  controllers: [FarmerController, DashboardController],
  providers: [FarmerService, FarmService, HarvestService],
})
export class FarmerModule { }
