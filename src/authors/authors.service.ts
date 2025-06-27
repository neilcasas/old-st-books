import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsStorageService } from '@app/authors-storage';
import { DuplicateRecordException } from 'src/exceptions/duplicate-record.exception';
import { AuthorNotFoundException } from 'src/exceptions/author-not-found.exception';

@Injectable()
export class AuthorsService {
  constructor(private readonly authorStorageService: AuthorsStorageService) { }

  create(createAuthorDto: CreateAuthorDto) {
    const duplicate = this.authorStorageService.getAuthorByName(createAuthorDto.firstName, createAuthorDto.lastName);
    if (duplicate) {
      throw new DuplicateRecordException();
    }
    return this.authorStorageService.createAuthor(createAuthorDto);
  }

  findAll() {
    return this.authorStorageService.getAuthors();
  }

  findOne(id: string) {
    return this.authorStorageService.getAuthor(id);
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return this.authorStorageService.updateAuthor(id, updateAuthorDto);
  }

  remove(id: string) {
    const toBeRemoved = this.authorStorageService.getAuthor(id);
    if (!toBeRemoved) {
      throw new AuthorNotFoundException({ authorId: id });
    }
    return this.authorStorageService.deleteAuthor(toBeRemoved);
  }

  /*
  getBooks(id: string) {
    return this.authorStorageService.getBooksFromAuthor(id);
  }
  */
}
