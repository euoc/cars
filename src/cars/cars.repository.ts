import { User } from '../auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';
import { CarStatus } from './car-status.enum';
import { Car } from './car.entity';
import { InternalServerErrorException, Logger } from '@nestjs/common';

@EntityRepository(Car)
export class CarsRepository extends Repository<Car> {
  private logger = new Logger('CarsRepository', true);

  async getCars(filterDto: GetCarsFilterDto, user: User): Promise<Car[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('car');
    query.where({ user });

    if (status) {
      query.andWhere('car.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(car.title) LIKE LOWER(:search) OR LOWER(car.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    try {
      const cars = await query.getMany();
      return cars;
    } catch (error) {
      this.logger.error(
        `Failed to get cars for user "${
          user.username
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createCar(CreateCarDto: CreateCarDto, user: User): Promise<Car> {
    const { title, description } = CreateCarDto;

    const car = this.create({
      title,
      description,
      status: CarStatus.NEW,
      user,
    });

    await this.save(car);
    return car;
  }
}
