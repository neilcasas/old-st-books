import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/authors/dto/update-author.dto';
import { Author } from 'src/authors/entities/author.entity';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { v4 as uuidv4 } from "uuid";

type AuthorshipType = {
  book_id: string;
  author_id: string;
}

@Injectable()
export class StorageService {

  private books: Set<CreateBookDto> = new Set([
    {
      id: "test-book-1",
      name: "The Pragmatic Programmer",
      genre: "Educational",
      pages: 352
    },
    {
      id: "test-book-2",
      name: "Dune",
      genre: ["Science Fiction", "Adventure"],
      pages: 688
    }
  ]);

  private authors: Set<CreateAuthorDto> = new Set([
    {
      id: 'test-author-1',
      name: 'Andy Hunt',
    },
    {
      id: 'test-author-2',
      name: 'Dave Thomas',
    },
    {
      id: 'test-author-3',
      name: 'Frank Herbert',
    },
  ]);

  private authorship: Set<AuthorshipType> = new Set([
    {
      book_id: "test-book-1",
      author_id: "test-author-1",
    },
    {
      book_id: "test-book-1",
      author_id: "test-author-2",
    },
    {
      book_id: "test-book-2",
      author_id: "test-author-3",
    },
  ]);

  // Book methods
  getBooks() {
    const books = [...this.books];
    return books;
  }

  getBook(id: string) {
    try {
      const books = [...this.books];
      return books.find((book) => book.id === id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  getBookByName(name: string) {
    try {
      const books = [...this.books]
      return books.find((book) => book.name === name);
    } catch (err) {

      // TODO: make book not found exception
      throw new NotFoundException();
    }
  }

  createBook(createBookDto: CreateBookDto) {
    if (!this.getBookByName(createBookDto.name)) {
      const newBook = {
        ...createBookDto,
        id: uuidv4(),
      };
      this.books.add(newBook);
      return newBook;
    }
    // TODO: Make duplicate book exception
    throw new Error();
  }

  deleteBook(id: string) {
    const toBeRemoved = this.getBook(id);
    if (toBeRemoved) {
      this.books.delete(toBeRemoved);
      return toBeRemoved;
    } else {
      throw new NotFoundException() // TODO: More descriptive not found here?
    }
  }

  updateBook(id: string, updateBookDto: UpdateBookDto) {
    const books = [...this.books];
    books.filter((book) => {
      if (book.id === id) {
        return { ...book, ...updateBookDto }
      }
      return book;
    })
    this.books = new Set(books);
  }

  // Author methods
  getAuthors() {
    const authors = [...this.authors];
    return authors;
  }

  getAuthor(id: string) {
    try {
      const authors = [...this.authors];
      return authors.find((author) => author.id === id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  getAuthorByName(name: string) {
    try {
      const authors = [...this.authors]
      return authors.find((author) => author.name === name);
    } catch (err) {
      // TODO: make author not found exception
      throw new NotFoundException();
    }
  }

  createAuthor(createAuthorDto: CreateAuthorDto) {
    if (!this.getAuthorByName(createAuthorDto.name)) {
      const newAuthor = {
        ...createAuthorDto,
        id: uuidv4(),
      };
      this.authors.add(newAuthor);
      return newAuthor;
    }
    // TODO: Make duplicate author exception or just one descriptive duplicate exception
    throw new Error();
  }

  updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto) {
    const authors = [...this.authors];
    authors.filter((author) => {
      if (author.id === id) {
        return { ...author, ...updateAuthorDto }
      }
      return author;
    })
    this.authors = new Set(authors);
  }

  deleteAuthor(id: string) {
    const toBeRemoved = this.getAuthor(id);
    if (toBeRemoved) {
      this.authors.delete(toBeRemoved);
      return toBeRemoved;
    } else {
      throw new NotFoundException() // TODO: More descriptive not found here?
    }
  }

  // Authorship methods
  link(bookId: string, authorId: string) {
    const record: AuthorshipType = {
      book_id: bookId, author_id: authorId
    }
    this.authorship.add(record);
  }

  unlink(record: AuthorshipType) {
    this.authorship.delete(record)
    return record;
  }
}
