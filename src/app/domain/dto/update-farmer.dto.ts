import { ApiExtraModels } from '@nestjs/swagger';
import { CreateFarmerDto } from './create-farmer.dto';

@ApiExtraModels()
export class UpdateFarmerDto extends CreateFarmerDto {
}
