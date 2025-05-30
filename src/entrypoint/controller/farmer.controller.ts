import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { FarmerService } from '../../app/domain/service/farmer.service';
import { CreateFarmerDto } from '../../app/domain/dto/create-farmer.dto';
import { UpdateFarmerDto } from '../../app/domain/dto/update-farmer.dto';
import { PaginationDto } from '../../app/domain/dto/pagination.dto';

@Controller('api/farmers')
export class FarmerController {
  constructor(private readonly farmerService: FarmerService) {}

  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmerService.create(createFarmerDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.farmerService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.farmerService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateFarmerDto: UpdateFarmerDto) {
    return this.farmerService.update(+id, updateFarmerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.farmerService.remove(+id);
  }
}
