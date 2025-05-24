import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateFarmDto } from 'src/app/domain/dto/create-farm.dto';

describe('CreateFarmDto', () => {
  it('should validate a correct farm', async () => {
    const dto = {
      farmName: 'Farm 1',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
      harvests: [],
    };
    const farm = plainToInstance(CreateFarmDto, dto);
    const errors = await validate(farm);
    expect(errors.length).toBe(0);
  });

  it('should fail if totalArea is not the sum of arableArea and vegetationArea', async () => {
    const dto = {
      farmName: 'Farm 1',
      totalArea: 90,
      arableArea: 60,
      vegetationArea: 40,
      harvests: [],
    };
    const farm = plainToInstance(CreateFarmDto, dto);
    const errors = await validate(farm);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'totalArea')).toBe(true);
  });

  it('should fail if farmName is empty', async () => {
    const dto = {
      farmName: '',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
      harvests: [],
    };
    const farm = plainToInstance(CreateFarmDto, dto);
    const errors = await validate(farm);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'farmName')).toBe(true);
  });

  it('should fail if harvests is not an array', async () => {
    const dto = {
      farmName: 'Farm 1',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
      harvests: null,
    };
    const farm = plainToInstance(CreateFarmDto, dto);
    const errors = await validate(farm);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors.some(e => e.property === 'harvests')).toBe(true);
  });
});