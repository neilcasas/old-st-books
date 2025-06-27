import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { AuthorshipStorageModule } from '@app/authorship-storage';
import { BooksStorageModule } from '@app/books-storage';
import { AuthorsStorageModule } from '@app/authors-storage';

@Module({
  imports: [BooksStorageModule, AuthorshipStorageModule, AuthorsStorageModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule { }
