import { Injectable } from '@nestjs/common';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/authors/dto/update-author.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { Author, Book, Authorship, Genre } from 'libs/types';
import { v4 as uuidv4 } from 'uuid';
import { BookNotFoundException } from 'src/exceptions/book-not-found.exception';
import { AuthorNotFoundException } from 'src/exceptions/author-not-found.exception';
import { DuplicateRecordException } from 'src/exceptions/duplicate-record.exception';
import { InvalidAuthorDeleteException } from 'src/exceptions/invalid-author-delete.exception';


// TODO: Separate into 3 services or libraries
@Injectable()
export class StorageService {
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

  private authors: Author[] = [
    {
      id: 'test-author-1',
      firstName: 'Andy',
      lastName: 'Hunt',
    },
    {
      id: 'test-author-2',
      firstName: 'Dave',
      lastName: 'Thomas',
    },
    {
      id: 'test-author-3',
      firstName: 'Frank',
      lastName: 'Herbert',
    },
  ];

  // represents the joint table between author and books
  private authorship: Authorship[] = [
    {
      id: 'test-link-1',
      bookId: 'test-book-1',
      authorId: 'test-author-1',
    },
    {
      id: 'test-link-2',
      bookId: 'test-book-1',
      authorId: 'test-author-2',
    },
    {
      id: 'test-link-3',
      bookId: 'test-book-2',
      authorId: 'test-author-3',
    },
  ];

  // Book methods
  getBooks() {
    return this.books;
  }

  getBook(id: string) {
    const book = this.books.find((book) => book.id === id);
    //TODO: Business logic for books should go to books service
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
      this.authorship = this.authorship.filter((record) => record.bookId !== id);
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

  getAuthorsFromBook(id: string) {
    const authors = this.authorship
      .filter((record) => record.bookId === id)
      .map((record) => ({
        ...this.getAuthor(record.authorId),
      }));
    return authors;
  }

  // Author methods
  getAuthors() {
    return this.authors;
  }

  getAuthor(id: string) {
    const author = this.authors.find((author) => author.id === id);

    // TODO: Business logic for author should go to authors service
    if (!author) {
      throw new AuthorNotFoundException({ authorId: id });
    }
    return author;
  }

  getAuthorByName(firstName: string, lastName: string) {
    const author = this.authors.find(
      (author) =>
        author.firstName === firstName && author.lastName === lastName,
    );
    return author;
  }

  createAuthor(createAuthorDto: CreateAuthorDto) {
    if (
      !this.getAuthorByName(createAuthorDto.firstName, createAuthorDto.lastName)
    ) {
      const newAuthor = {
        id: uuidv4(),
        firstName: createAuthorDto.firstName,
        lastName: createAuthorDto.lastName,
      };
      this.authors.push(newAuthor);
      return newAuthor;
    }
    throw new DuplicateRecordException();
  }

  updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto) {
    this.authors = this.authors.map((author) => {
      if (author.id === id) {
        return { ...author, ...updateAuthorDto };
      }
      return author;
    });

    return this.getAuthor(id);
  }

  deleteAuthor(id: string) {
    const toBeRemoved = this.getAuthor(id);
    if (toBeRemoved) {
      // get author's books before deletion
      const books = this.getBooksFromAuthor(toBeRemoved.id);

      // only delete if author has no books
      if (books.length === 0) {
        this.authors = this.authors.filter(
          (author) => author.id !== toBeRemoved.id,
        );
        this.authorship = this.authorship.filter((record) => record.authorId !== id);
        return toBeRemoved;
      } else {
        // throw forbidden exception if deleting author with books
        throw new InvalidAuthorDeleteException();
      }
    } else {
      throw new AuthorNotFoundException({ authorId: id });
    }
  }

  getBooksFromAuthor(id: string) {
    const books = this.authorship
      .filter((record) => record.authorId === id)
      .map((record) => ({
        ...this.getBook(record.bookId),
      }));
    return books;
  }

  // Authorship methods
  // TODO: Business logic for authorship should go to authorship service
  link(bookId: string, authorId: string) {
    const duplicate = this.authorship.filter(
      (record) => record.bookId === bookId && record.authorId === authorId,
    );
    if (duplicate) {
      throw new DuplicateRecordException();
    }
    const record: Authorship = {
      id: uuidv4(),
      bookId: bookId,
      authorId: authorId,
    };
    this.authorship.push(record);
    return record;
  }

  unlink(bookId: string, authorId: string) {
    const record = this.authorship.find(
      (record) => record.bookId === bookId && record.authorId === authorId,
    );
    if (record) {
      this.authorship = this.authorship.filter(
        (authorship) => authorship.id !== record.id,
      );
    }
    return record;
  }

}
