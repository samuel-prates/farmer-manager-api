import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, Max, Min } from 'class-validator';

@ApiExtraModels()
export class CreateHarvestDto {
    @IsNumber()
    @Max(2200)
    @Min(1800)
    @ApiProperty()
    year: number;

    @IsString()
    @ApiProperty()
    culture: string;
}