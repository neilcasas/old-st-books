import { Test, TestingModule } from '@nestjs/testing';
import { AuthorshipStorageService } from './authorship-storage.service';

describe('AuthorshipStorageService', () => {
  let service: AuthorshipStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthorshipStorageService],
    }).compile();

    service = module.get<AuthorshipStorageService>(AuthorshipStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
