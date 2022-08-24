import { IsEnum } from 'class-validator';
import { CarStatus } from '../car-status.enum';

export class UpdateCarStatusDto {
  @IsEnum(CarStatus)
  status: CarStatus;
}
