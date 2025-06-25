import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { StorageModule } from '@app/storage';

@Module({
  imports: [StorageModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule { }
