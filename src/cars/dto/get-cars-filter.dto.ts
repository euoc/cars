import { IsEnum, IsOptional, IsString } from 'class-validator';
import { CarStatus } from '../car-status.enum';

export class GetCarsFilterDto {
  @IsOptional()
  @IsEnum(CarStatus)
  status?: CarStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
