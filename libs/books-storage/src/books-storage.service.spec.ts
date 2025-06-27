import { Test, TestingModule } from '@nestjs/testing';
import { BooksStorageService } from './books-storage.service';

describe('BooksStorageService', () => {
  let service: BooksStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BooksStorageService],
    }).compile();

    service = module.get<BooksStorageService>(BooksStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
