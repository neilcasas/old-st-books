import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { CreateBookDto } from 'src/books/dto/create-book.dto';
import { v4 as uuidv4 } from "uuid";

type AuthorshipType = {
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

  private authorship: AuthorshipType[] = [

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
  ]

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

  createBook(createBookDto: CreateBookDto) {
    if (!this.getBookByName(createBookDto.name)) {
      const newBook = {
        ...createBookDto,
        id: uuidv4(),
      };
      this.books.push(newBook);
      return newBook;
    }
    // TODO: Make duplicate book exception
    throw new Error();
  }

  getAuthors() {
    return this.authors;
  }

  getAuthor(id: string) {
    try {
      return this.authors.find((author) => author.id === id);
    }
    catch (err) {
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

  createAuthor(createAuthorDto: CreateAuthorDto) {
    if (!this.getAuthorByName(createAuthorDto.name)) {
      const newAuthor = {
        ...createAuthorDto,
        id: uuidv4(),
      };
      this.authors.push(newAuthor);
      return newAuthor;
    }
    // TODO: Make duplicate author exception or just one descriptive duplicate exception
    throw new Error();
  }

}
