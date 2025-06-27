import { Module } from '@nestjs/common';
import { BooksStorageService } from './books-storage.service';

@Module({
  providers: [BooksStorageService],
  exports: [BooksStorageService],
})
export class BooksStorageModule {}
