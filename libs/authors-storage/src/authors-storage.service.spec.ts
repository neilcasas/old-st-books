import { Test, TestingModule } from '@nestjs/testing';
import { AuthorsStorageService } from './authors-storage.service';

describe('AuthorsStorageService', () => {
  let service: AuthorsStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorsStorageService],
    }).compile();

    service = module.get<AuthorsStorageService>(AuthorsStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
