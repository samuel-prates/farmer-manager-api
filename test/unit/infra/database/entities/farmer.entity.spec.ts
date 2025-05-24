import { Farmer } from 'src/infra/database/entities/farmer.entity';
import { Farm } from 'src/infra/database/entities/farm.entity';

describe('Farmer Entity', () => {
  it('should create a Farmer instance with properties', () => {
    const farm: Farm = { id: 1 } as Farm;
    const farmer = new Farmer();
    farmer.id = 1;
    farmer.federalIdentification = '12345678901';
    farmer.farmerName = 'John Doe';
    farmer.farms = [farm];

    expect(farmer.id).toBe(1);
    expect(farmer.federalIdentification).toBe('12345678901');
    expect(farmer.farmerName).toBe('John Doe');
    expect(farmer.farms).toEqual([farm]);
  });

  it('should have a default farms array as undefined', () => {
    const farmer = new Farmer();
    expect(farmer.farms).toBeUndefined();
  });
});