import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { StorageService } from '@app/storage';

@Injectable()
export class BooksService {
  constructor(private readonly storageService: StorageService) { }

  create(createBookDto: CreateBookDto) {
    return this.storageService.createBook(createBookDto);
  }

  findAll() {
    return this.storageService.getBooks();
  }

  findOne(id: string) {
    return this.storageService.getBook(id);
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.storageService.updateBook(id, updateBookDto);
  }

  remove(id: string) {
    return this.storageService.deleteBook(id);
  }
}
