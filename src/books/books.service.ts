import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { StorageService } from '@app/storage';

@Injectable()
export class BooksService {
  constructor(private readonly storageService: StorageService) { }

  create(createBookDto: CreateBookDto) {
    // TODO: fix bug on dto here
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

  getAuthors(id: string) {
    return this.storageService.getAuthorsFromBook(id);
  }

  linkAuthor(bookId: string, authorId: string) {
    // Verify if the book exists
    const book = this.storageService.getBook(bookId);
    if (!book) {
      // TODO: Be more specific about this exception
      throw new NotFoundException();
    }
    const author = this.storageService.getAuthor(authorId);

    // Throw exception if author not found
    if (!author) {
      throw new NotFoundException();
    }

    return this.storageService.link(bookId, authorId);
  }

  removeLink(authorId: string, bookId: string) {
    return this.storageService.unlink(bookId, authorId);
  }
}
