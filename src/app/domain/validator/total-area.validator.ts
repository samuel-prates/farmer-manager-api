import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

@ValidatorConstraint({ name: 'TotalAreaValidator', async: false })
export class TotalAreaValidator implements ValidatorConstraintInterface {
  validate(_: any, args: ValidationArguments) {
    const obj = args.object as any;
    return obj.totalArea === obj.arableArea + obj.vegetationArea;
  }
  defaultMessage(args: ValidationArguments) {
    return 'totalArea must be equal to arableArea + vegetationArea';
  }
}