import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/authors/dto/update-author.dto';
import { Author } from 'libs/types';
import { v4 as uuidv4 } from 'uuid';
import { AuthorNotFoundException } from 'src/exceptions/author-not-found.exception';
import { DuplicateRecordException } from 'src/exceptions/duplicate-record.exception';

@Injectable()
export class AuthorsStorageService {
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

  getAuthors() {
    return this.authors;
  }

  getAuthor(id: string) {
    const author = this.authors.find((author) => author.id === id);
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
      this.authors = this.authors.filter(
        (author) => author.id !== toBeRemoved.id,
      );
      return toBeRemoved;
    } else {
      throw new AuthorNotFoundException({ authorId: id });
    }
  }
}
