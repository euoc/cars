import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { CarStatus } from './car-status.enum';
import { CarsRepository } from './cars.repository';
import { CarsService } from './cars.service';

const mockCarsRepository = () => ({
  getCars: jest.fn(),
  findOne: jest.fn(),
});

const mockUser = {
  username: 'Ariel',
  id: 'someId',
  password: 'somePassword',
  cars: [],
};

describe('CarsService', () => {
  let CarsService: CarsService;
  let CarsRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CarsService,
        { provide: CarsRepository, useFactory: mockCarsRepository },
      ],
    }).compile();

    CarsService = module.get(CarsService);
    CarsRepository = module.get(CarsRepository);
  });

  describe('getCars', () => {
    it('calls CarsRepository.getCars and returns the result', async () => {
      CarsRepository.getCars.mockResolvedValue('someValue');
      const result = await CarsService.getCars(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getCarById', () => {
    it('calls CarsRepository.findOne and returns the result', async () => {
      const mockCar = {
        title: 'Test title',
        description: 'Test desc',
        id: 'someId',
        status: CarStatus.NEW,
      };

      CarsRepository.findOne.mockResolvedValue(mockCar);
      const result = await CarsService.getCarById('someId', mockUser);
      expect(result).toEqual(mockCar);
    });

    it('calls CarsRepository.findOne and handles an error', async () => {
      CarsRepository.findOne.mockResolvedValue(null);
      expect(CarsService.getCarById('someId', mockUser)).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
