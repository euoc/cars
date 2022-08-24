import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { CarsController } from './cars.controller';
import { CarsRepository } from './cars.repository';
import { CarsService } from './cars.service';

@Module({
  imports: [TypeOrmModule.forFeature([CarsRepository]), AuthModule],
  controllers: [CarsController],
  providers: [CarsService],
})
export class CarsModule {}
