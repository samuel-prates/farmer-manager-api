import { TotalAreaValidator } from 'src/app/domain/validator/total-area.validator';

describe('TotalAreaValidator', () => {
  const validator = new TotalAreaValidator();

  it('should return true if totalArea equals arableArea + vegetationArea', () => {
    const obj = { totalArea: 100, arableArea: 60, vegetationArea: 40 };
    const result = validator.validate(null, { object: obj } as any);
    expect(result).toBe(true);
  });

  it('should return false if totalArea does not equal arableArea + vegetationArea', () => {
    const obj = { totalArea: 90, arableArea: 60, vegetationArea: 40 };
    const result = validator.validate(null, { object: obj } as any);
    expect(result).toBe(false);
  });

  it('should return correct default message', () => {
    expect(validator.defaultMessage({} as any)).toBe('totalArea must be equal to arableArea + vegetationArea');
  });
});