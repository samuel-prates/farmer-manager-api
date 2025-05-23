import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { CreateFarmDto } from './create-farm.dto';
import { IsString, IsArray, Matches, ValidateNested, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';

@ApiExtraModels()
export class CreateFarmerDto {
    @IsNumberString()
    @Matches(/^(\d{11}|\d{14})$/, { message: 'federalIdentification must be a string of 11 digits for CPF or 14 digits for CNPJ', })
    @ApiProperty()
    federalIdentification: string;

    @IsString()
    @ApiProperty()
    farmerName: string;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateFarmDto)
    @ApiProperty({ type: [CreateFarmDto] })
    farms: CreateFarmDto[] = [];
}
