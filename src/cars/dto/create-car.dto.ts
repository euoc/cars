import { IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}
