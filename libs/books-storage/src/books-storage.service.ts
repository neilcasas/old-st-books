import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { Book, Genre } from 'libs/types';
import { v4 as uuidv4 } from 'uuid';

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
    return book;
  }

  getBookByName(name: string) {
    const book = this.books.find((book) => book.name === name);
    return book;
  }

  createBook({ name, genre, pages }: CreateBookDto) {
    const newBook = {
      id: uuidv4(),
      name,
      genre,
      pages,
    };
    this.books.push(newBook);
    return newBook;
  }

  deleteBook(book: Book) {
    this.books = this.books.filter((book) => book.id !== book.id);
    return book;
  }

  updateBook(id: string, updateBookDto: UpdateBookDto) {
    this.books = this.books.map((book) => {
      if (book.id === id) {
        return { ...book, ...updateBookDto };
      }
      return book;
    });
  }
}
