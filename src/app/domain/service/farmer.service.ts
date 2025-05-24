import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmerDto } from '../dto/create-farmer.dto';
import { UpdateFarmerDto } from '../dto/update-farmer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Farmer } from 'src/infra/database/entities/farmer.entity';
import { Repository } from 'typeorm';
import { FarmService } from './farm.service';

@Injectable()
export class FarmerService {
  constructor(
    @InjectRepository(Farmer)
    private readonly farmerRepository: Repository<Farmer>,
    @Inject(FarmService)
    private readonly farmService: FarmService,
  ) { }
  
  async create(createFarmerDto: CreateFarmerDto) {
    try {
      const exists = await this.farmerRepository.findOneBy({
        federalIdentification: createFarmerDto.federalIdentification,
      });
      if (exists) {
        throw new ConflictException('Farmer with this federal identification already exists');
      }
      const farmer = this.farmerRepository.create(createFarmerDto);
      await this.farmerRepository.save(farmer);
      return farmer;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Farmer[]> {
    return this.farmerRepository.find({
      relations: {
        farms: true,
      },
    });
  }

  async findOne(id: number): Promise<Farmer> {
    const farmer = await this.farmerRepository.findOne({
      where: { id },
      relations: {
        farms: {
          harvests: true,
        },
      },
    });
    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }
    return farmer;
  }

  async update(id: number, updateFarmerDto: UpdateFarmerDto): Promise<Farmer> {
    const farmer = await this.farmerRepository.findOneBy({ id });
    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }

    await this.farmService.deleteByFarmerId(id);
    const updated = this.farmerRepository.merge(farmer, updateFarmerDto);
    const updatedFarmer = await this.farmerRepository.save(updated);
    return updatedFarmer;
  }

  async remove(id: number): Promise<void> {
    const farmer = await this.farmerRepository.findOneBy({ id });
    if (!farmer) {
      throw new NotFoundException('Farmer not found');
    }
    await this.farmerRepository.delete(id);
  }
}
