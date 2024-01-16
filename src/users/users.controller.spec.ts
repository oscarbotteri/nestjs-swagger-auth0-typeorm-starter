import { DeepMocked, createMock } from '@golevelup/ts-jest';
import { Test, TestingModule } from '@nestjs/testing';
import { plainToInstance } from 'class-transformer';
import { PaginationDto } from '../common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let module: TestingModule;
  let usersController: UsersController;
  let usersService: DeepMocked<UsersService>;

  beforeEach(async () => {
    jest.clearAllMocks();

    module = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useFactory: () => createMock<UsersService>(),
        },
      ],
    }).compile();

    usersController = module.get(UsersController);
    usersService = module.get(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('findAll', () => {
    it('should call the service to return a list of reecords', async () => {
      const findAllSpy = jest.spyOn(usersService, 'findAll');
      const pagination = plainToInstance(PaginationDto, {
        page: 1,
        limit: 100,
      });

      findAllSpy.mockResolvedValue({ total: 0, results: [] });

      await usersController.findAll(pagination);

      expect(findAllSpy).toHaveBeenCalledTimes(1);
      expect(findAllSpy).toHaveBeenCalledWith(pagination);
    });
  });
});
