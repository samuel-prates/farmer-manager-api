import { Controller, Get } from '@nestjs/common';
import { DashboardService } from '../../app/domain/service/dashboard.service';

@Controller('api/dashboard')
export class DashboardController {
  constructor(
    private readonly dashboardService: DashboardService,
  ) {}

  @Get('farm-states')
  async getFarmStates() {
    return this.dashboardService.getFarmStates();
  }

  @Get('harvest-cultures')
  async getHarvestCultures() {
    return this.dashboardService.getHarvestCultures();
  }

  @Get('areas')
  async getAreas() {
    return this.dashboardService.getAreas();
  }
}
