import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {

    const ApiServiceProvider = {
      provide: UsersService,
      useFactory: () => ({
        create: jest.fn(() => []),
        findAll: jest.fn(() => []),
        findONe: jest.fn(() => { }),
        update: jest.fn(() => { }),
        delete: jest.fn(() => { })
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService, ApiServiceProvider],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);

  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('calls create method', () => {
    const dto = new CreateUserDto();
    expect(controller.create(dto)).not.toEqual(null);
  })

  it('calls create method with correct payload', () => {
    const dto = new CreateUserDto();
    controller.create(dto);
    expect(service.create).toHaveBeenCalled();
    expect(service.create).toHaveBeenCalledWith(dto);
  })
});
