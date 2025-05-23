import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { CreateHarvestDto } from './create-harvest.dto';
import { IsString, IsNumber, IsArray, IsNotEmpty, ValidateNested, Validate } from 'class-validator';
import { TotalAreaValidator } from '../validator/total-area.validator';
import { Type } from 'class-transformer';

@ApiExtraModels()
export class CreateFarmDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    farmName: string;

    @IsNumber()
    @IsNotEmpty()
    @Validate(TotalAreaValidator)
    @ApiProperty()
    totalArea: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    arableArea: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    vegetationArea: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateHarvestDto)
    @IsNotEmpty()
    @ApiProperty({ type: [CreateHarvestDto] })
    harvests: CreateHarvestDto[] = [];
}