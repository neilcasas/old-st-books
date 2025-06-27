import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { Book, Genre } from 'libs/types';
import { v4 as uuidv4 } from 'uuid';
import { BookNotFoundException } from 'src/exceptions/book-not-found.exception';
import { DuplicateRecordException } from 'src/exceptions/duplicate-record.exception';

@Injectable()
export class BooksStorageService {
  private books: Book[] = [
    {
      id: 'test-book-1',
      name: 'The Pragmatic Programmer',
      genre: [Genre.Educational],
      pages: 352,
    },
    {
      id: 'test-book-2',
      name: 'Dune',
      genre: [Genre.SciFi, Genre.Fiction, Genre.Adventure],
      pages: 688,
    },
  ];

  getBooks() {
    return this.books;
  }

  getBook(id: string) {
    const book = this.books.find((book) => book.id === id);
    if (!book) {
      throw new BookNotFoundException({ bookId: id });
    }
    return book;
  }

  getBookByName(name: string) {
    const book = this.books.find((book) => book.name === name);
    return book;
  }

  createBook({ name, genre, pages }: CreateBookDto) {
    if (!this.getBookByName(name)) {
      const newBook = {
        id: uuidv4(),
        name,
        genre,
        pages,
      };
      this.books.push(newBook);
      return newBook;
    }
    throw new DuplicateRecordException();
  }

  deleteBook(id: string) {
    const toBeRemoved = this.getBook(id);
    if (toBeRemoved) {
      this.books = this.books.filter((book) => book.id !== toBeRemoved.id);
      return toBeRemoved;
    } else {
      throw new BookNotFoundException({ bookId: id });
    }
  }

  updateBook(id: string, updateBookDto: UpdateBookDto) {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return { ...book, ...updateBookDto };
      }
      return book;
    });
    return this.getBook(id);
  }
}
