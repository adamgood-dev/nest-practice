import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma/prisma.service';

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should get data from mocked prisma service', async () => {
    prisma.user.findUnique = jest.fn().mockReturnValueOnce(
      {id: 1, username: "example_user", email: "example@default.com"}
    );
    const found_user = await service.findOne(1);
    expect(found_user.username).toBe("example_user");
  })
});
