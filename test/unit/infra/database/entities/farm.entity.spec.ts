import { Farm } from 'src/infra/database/entities/farm.entity';
import { Farmer } from 'src/infra/database/entities/farmer.entity';
import { Harvest } from 'src/infra/database/entities/harvest.entity';

describe('Farm Entity', () => {
  it('should create a Farm instance with properties', () => {
    const farmer: Farmer = { id: 1 } as Farmer;
    const harvest: Harvest = { id: 1 } as Harvest;
    const farm = new Farm();
    farm.id = 1;
    farm.farmName = 'Test Farm';
    farm.totalArea = 100;
    farm.arableArea = 60;
    farm.vegetationArea = 40;
    farm.farmer = farmer;
    farm.harvests = [harvest];

    expect(farm.id).toBe(1);
    expect(farm.farmName).toBe('Test Farm');
    expect(farm.totalArea).toBe(100);
    expect(farm.arableArea).toBe(60);
    expect(farm.vegetationArea).toBe(40);
    expect(farm.farmer).toBe(farmer);
    expect(farm.harvests).toEqual([harvest]);
  });

  it('should have undefined farmer and harvests by default', () => {
    const farm = new Farm();
    expect(farm.farmer).toBeUndefined();
    expect(farm.harvests).toBeUndefined();
  });
});