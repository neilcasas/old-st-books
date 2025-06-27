import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from 'src/authors/dto/create-author.dto';
import { UpdateAuthorDto } from 'src/authors/dto/update-author.dto';
import { Author } from 'libs/types';
import { v4 as uuidv4 } from 'uuid';

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
    const newAuthor = {
      id: uuidv4(),
      firstName: createAuthorDto.firstName,
      lastName: createAuthorDto.lastName,
    };
    this.authors.push(newAuthor);
    return newAuthor;
  }

  updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto) {
    this.authors = this.authors.map((author) => {
      if (author.id === id) {
        return { ...author, ...updateAuthorDto };
      }
      return author;
    });
  }

  deleteAuthor(author: Author) {
    this.authors = this.authors.filter(
      (author) => author.id !== author.id,
    );
    return author;
  }
}
