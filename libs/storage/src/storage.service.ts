import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/authors/dto/update-author.dto';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { UpdateBookDto } from 'src/books/dto/update-book.dto';
import { v4 as uuidv4 } from "uuid";

type AuthorshipType = {
  id: string;
  book_id: string;
  author_id: string;
}

@Injectable()
export class StorageService {

  private books: CreateBookDto[] = [
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
  ];

  private authors: CreateAuthorDto[] = [
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
  ];

  // represents the joint table between author and books
  private authorship: AuthorshipType[] = [
    {
      id: "test-link-1",
      book_id: "test-book-1",
      author_id: "test-author-1",
    },
    {
      id: "test-link-2",
      book_id: "test-book-1",
      author_id: "test-author-2",
    },
    {
      id: "test-link-3",
      book_id: "test-book-2",
      author_id: "test-author-3",
    },
  ];

  // Book methods
  getBooks() {
    return this.books;
  }

  getBook(id: string) {
    try {
      return this.books.find((book) => book.id === id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  getBookByName(name: string) {
    try {
      return this.books.find((book) => book.name === name);
    } catch (err) {

      // TODO: make book not found exception
      throw new NotFoundException();
    }
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
    // TODO: Make duplicate book exception
    throw new Error();
  }

  deleteBook(id: string) {
    const toBeRemoved = this.getBook(id);
    if (toBeRemoved) {
      this.books = this.books.filter((book) => book.id !== toBeRemoved.id);
      return toBeRemoved;
    } else {
      throw new NotFoundException() // TODO: More descriptive not found here?
    }
  }

  updateBook(id: string, updateBookDto: UpdateBookDto) {
    this.books = this.books.filter((book) => {
      if (book.id === id) {
        return { ...book, ...updateBookDto }
      }
      return book;
    })
  }

  getAuthorsFromBook(id: string) {
    const authors = this.authorship.filter((record) => record.book_id === id).map((record) => ({
      ...this.getAuthor(record.author_id)
    }));
    return authors;
  }

  // Author methods
  getAuthors() {
    return this.authors;
  }

  getAuthor(id: string) {
    try {
      return this.authors.find((author) => author.id === id);
    } catch (err) {
      throw new NotFoundException();
    }
  }

  getAuthorByName(name: string) {
    try {
      return this.authors.find((author) => author.name === name);
    } catch (err) {
      // TODO: make author not found exception
      throw new NotFoundException();
    }
  }

  createAuthor(name: string) {
    if (!this.getAuthorByName(name)) {
      const newAuthor = {
        id: uuidv4(),
        name,
      };
      this.authors.push(newAuthor);
      return newAuthor;
    }
    // TODO: Make duplicate author exception or just one descriptive duplicate exception
    throw new Error();
  }

  updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto) {
    this.authors = this.authors.filter((author) => {
      if (author.id === id) {
        return { ...author, ...updateAuthorDto }
      }
      return author;
    })
  }

  deleteAuthor(id: string) {
    const toBeRemoved = this.getAuthor(id);
    if (toBeRemoved) {
      // get author's books before deletion
      const books = this.getBooksFromAuthor(toBeRemoved.id);

      // only delete if author has no books
      if (!books) {
        this.authors = this.authors.filter((author) => author.id !== toBeRemoved.id);
        return toBeRemoved;
      } else {
        throw new Error(); // TODO: make delete author more descriptive
      }
    } else {
      throw new NotFoundException() // TODO: More descriptive not found here?
    }
  }

  getBooksFromAuthor(id: string) {
    const books = this.authorship.filter((record) => record.author_id === id).map((record) => ({
      ...this.getBook(record.book_id)
    }));
    return books;
  }

  // Authorship methods
  link(bookId: string, authorId: string) {
    const record: AuthorshipType = {
      id: uuidv4(),
      book_id: bookId,
      author_id: authorId
    }
    this.authorship.push(record);
    return record;
  }

  unlink(bookId: string, authorId: string) {
    const record = this.authorship.find((record) => record.book_id === bookId && record.author_id === authorId);
    if (record) {
      this.authorship.filter((authorship) => authorship.id !== record.id);
    }
    return record;
  }
}
