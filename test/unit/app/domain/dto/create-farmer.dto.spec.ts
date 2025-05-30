import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import { CreateFarmerDto } from 'src/app/domain/dto/create-farmer.dto';
import { CreateFarmDto } from 'src/app/domain/dto/create-farm.dto'; ;

describe('CreateFarmerDto', () => {
  it('should validate a correct farmer', async () => {
    const farm: CreateFarmDto = {
      farmName: 'Farm 1',
      city: 'Test City',
      state: 'TS',
      totalArea: 100,
      arableArea: 60,
      vegetationArea: 40,
      harvests: [],
    };
    const farmer = plainToInstance(CreateFarmerDto, {
      federalIdentification: '12345678901',
      farmerName: 'John Doe',
      farms: [farm],
    });

    const errors = await validate(farmer);
    expect(errors.length).toBe(0);
  });

  it('should fail if federalIdentification is invalid', async () => {
    const farmer = plainToInstance(CreateFarmerDto, {
      federalIdentification: 'invalid',
      farmerName: 'John Doe',
      farms: [],
    });

    const errors = await validate(farmer);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('federalIdentification');
  });

  it('should fail if farms is not an array of valid farms', async () => {
    const farmer = plainToInstance(CreateFarmerDto, {
      federalIdentification: '12345678901',
      farmerName: 'John Doe',
      farms: [{}], // invalid farm
    });

    const errors = await validate(farmer);
    expect(errors.length).toBeGreaterThan(0);
    expect(errors[0].property).toBe('farms');
  });
});
