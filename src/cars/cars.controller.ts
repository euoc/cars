import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { CreateCarDto } from './dto/create-car.dto';
import { GetCarsFilterDto } from './dto/get-cars-filter.dto';
import { UpdateCarStatusDto } from './dto/update-car-status.dto';
import { Car } from './car.entity';
import { CarsService } from './cars.service';
import { Logger } from '@nestjs/common';

@Controller('cars')
@UseGuards(AuthGuard())
export class CarsController {
  private logger = new Logger('CarsController');

  constructor(private CarsService: CarsService) {}

  @Get()
  getCars(
    @Query() filterDto: GetCarsFilterDto,
    @GetUser() user: User,
  ): Promise<Car[]> {
    this.logger.verbose(
      `User "${user.username}" retrieving all cars. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.CarsService.getCars(filterDto, user);
  }

  @Get('/:id')
  getCarById(@Param('id') id: string, @GetUser() user: User): Promise<Car> {
    return this.CarsService.getCarById(id, user);
  }

  @Post()
  createCar(
    @Body() CreateCarDto: CreateCarDto,
    @GetUser() user: User,
  ): Promise<Car> {
    this.logger.verbose(
      `User "${user.username}" creating a new car. Data: ${JSON.stringify(
        CreateCarDto,
      )}`,
    );
    return this.CarsService.createCar(CreateCarDto, user);
  }

  @Delete('/:id')
  deleteCar(@Param('id') id: string, @GetUser() user: User): Promise<void> {
    return this.CarsService.deleteCar(id, user);
  }

  @Patch('/:id/status')
  updateCarStatus(
    @Param('id') id: string,
    @Body() updateCarStatusDto: UpdateCarStatusDto,
    @GetUser() user: User,
  ): Promise<Car> {
    const { status } = updateCarStatusDto;
    return this.CarsService.updateCarStatus(id, status, user);
  }
}
