import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookNotFoundException } from 'src/exceptions/book-not-found.exception';
import { BooksStorageService } from '@app/books-storage';
import { DuplicateRecordException } from 'src/exceptions/duplicate-record.exception';
import { AuthorshipStorageService } from '@app/authorship-storage';
import { AuthorsStorageService } from '@app/authors-storage';
import { AuthorNotFoundException } from 'src/exceptions/author-not-found.exception';
import { AuthorshipNotFoundException } from 'src/exceptions/authorship-not-found.exception';

@Injectable()
export class BooksService {
  constructor(
    private readonly bookStorageService: BooksStorageService,
    private readonly authorshipStorageService: AuthorshipStorageService,
    private readonly authorStorageService: AuthorsStorageService,
  ) {}

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
    return book;
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

  getAuthors(id: string) {
    const book = this.bookStorageService.getBook(id);
    if (!book) {
      throw new BookNotFoundException({ bookId: id });
    }
    return this.authorshipStorageService.getAuthorshipsByBookId(id);
  }
  linkAuthor(bookId: string, authorId: string) {
    const book = this.bookStorageService.getBook(bookId);
    if (!book) {
      throw new BookNotFoundException({ bookId: bookId });
    }
    const author = this.authorStorageService.getAuthor(authorId);

    // Throw exception if author not found
    if (!author) {
      throw new AuthorNotFoundException({ authorId: authorId });
    }

    return this.authorshipStorageService.link(bookId, authorId);
  }

  removeLink(bookId: string, authorId: string) {
    const authorship = this.authorshipStorageService.getAuthorship({
      bookId: bookId,
      authorId: authorId,
    });
    if (!authorship) {
      throw new AuthorshipNotFoundException(bookId, authorId);
    }
    return this.authorshipStorageService.unlink(authorship);
  }
}
