import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { StorageService } from '@app/storage';

@Injectable()
export class BooksService {
  constructor(private readonly storageService: StorageService) { }

  create(createBookDto: CreateBookDto) {
    // TODO:: only create when book has an author
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

  linkAuthor(name: string, bookId: string) {
    // Verify if the book exists
    const book = this.storageService.getBook(bookId);
    if (!book) {
      // TODO: Be more specific about this exception
      throw new NotFoundException();
    }
    let author = this.storageService.getAuthorByName(name);
    // If the author does not exist, create that author
    if (!author) {
      author = this.storageService.createAuthor(name);
    }
    // Create record in joint table
    const record = this.storageService.link(bookId, author.id);
    return record;
  }
}
