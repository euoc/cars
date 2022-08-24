import { Injectable, NotFoundException } from '@nestjs/common';
import { CarStatus } from './car-status.enum';
import { CreateCarDto } from './dto/create-car.dto';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';
import { CarsRepository } from './cars.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './car.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarsRepository)
    private CarsRepository: CarsRepository,
  ) {}

  getCars(filterDto: GetCarsFilterDto, user: User): Promise<Car[]> {
    return this.CarsRepository.getCars(filterDto, user);
  }

  async getCarById(id: string, user: User): Promise<Car> {
    const found = await this.CarsRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Car with ID "${id}" not found`);
    }

    return found;
  }

  createCar(CreateCarDto: CreateCarDto, user: User): Promise<Car> {
    return this.CarsRepository.createCar(CreateCarDto, user);
  }

  async deleteCar(id: string, user: User): Promise<void> {
    const result = await this.CarsRepository.delete({ id, user });

    if (result.affected === 0) {
      throw new NotFoundException(`Car with ID "${id}" not found`);
    }
  }

  async updateCarStatus(
    id: string,
    status: CarStatus,
    user: User,
  ): Promise<Car> {
    const car = await this.getCarById(id, user);

    car.status = status;
    await this.CarsRepository.save(car);

    return car;
  }
}
