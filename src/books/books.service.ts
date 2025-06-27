import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { AuthorNotFoundException } from 'src/exceptions/author-not-found.exception';
import { BookNotFoundException } from 'src/exceptions/book-not-found.exception';
import { BooksStorageService } from '@app/books-storage';
import { DuplicateRecordException } from 'src/exceptions/duplicate-record.exception';

@Injectable()
export class BooksService {
  constructor(private readonly bookStorageService: BooksStorageService) {}

  create(createBookDto: CreateBookDto) {
    // Check if book exists
    const duplicate = this.bookStorageService.getBookByName(createBookDto.name);
    if (duplicate) {
      throw new DuplicateRecordException();
    }
    return this.bookStorageService.createBook(createBookDto);
  }

  findAll() {
    return this.bookStorageService.getBooks();
  }

  findOne(id: string) {
    const book = this.bookStorageService.getBook(id);
    if (!book) {
      throw new BookNotFoundException({ bookId: id });
    }
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    const toBeUpdated = this.bookStorageService.getBook(id);
    if (!toBeUpdated) {
      throw new BookNotFoundException({ bookId: id });
    }
    return this.bookStorageService.updateBook(id, updateBookDto);
  }

  remove(id: string) {
    const toBeRemoved = this.bookStorageService.getBook(id);
    if (!toBeRemoved) {
      throw new BookNotFoundException({ bookId: id });
    }
    return this.bookStorageService.deleteBook(toBeRemoved);
  }

  //TODO: Implement with authorship service
  /*
    getAuthors(id: string) {
      return this.bookStorageService.getAuthorsFromBook(id);
    }
  
    linkAuthor(bookId: string, authorId: string) { // Verify if the book exists const book = this.bookStorageService.getBook(bookId); if (!book) {
      throw new BookNotFoundException({ bookId: bookId });
    }
    const author = this.bookStorageService.getAuthor(authorId);
  
    // Throw exception if author not found
    if(!author) {
      throw new AuthorNotFoundException({ authorId: authorId });
    }
  
      return this.bookStorageService.link(bookId, authorId);
    }
  
  removeLink(bookId: string, authorId: string) {
    return this.bookStorageService.unlink(bookId, authorId);
  }
  */
}
