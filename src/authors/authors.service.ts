import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsStorageService } from '@app/authors-storage';
import { DuplicateRecordException } from 'src/exceptions/duplicate-record.exception';
import { AuthorNotFoundException } from 'src/exceptions/author-not-found.exception';
import { AuthorshipStorageService } from '@app/authorship-storage';
import { InvalidAuthorDeleteException } from 'src/exceptions/invalid-author-delete.exception';

@Injectable()
export class AuthorsService {
  constructor(
    private readonly authorStorageService: AuthorsStorageService,
    private readonly authorshipStorageService: AuthorshipStorageService,
  ) {}

  create(createAuthorDto: CreateAuthorDto) {
    const duplicate = this.authorStorageService.getAuthorByName(
      createAuthorDto.firstName,
      createAuthorDto.lastName,
    );
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
    const toBeUpdated = this.authorStorageService.getAuthor(id);
    if (!toBeUpdated) {
      throw new AuthorNotFoundException({ authorId: id });
    }
    this.authorStorageService.updateAuthor(id, updateAuthorDto);
    const updated = this.authorStorageService.getAuthor(id);
    return updated;
  }

  remove(id: string) {
    const toBeRemoved = this.authorStorageService.getAuthor(id);
    if (!toBeRemoved) {
      throw new AuthorNotFoundException({ authorId: id });
    }

    // Get author's books
    const books = this.getBooks(toBeRemoved.id);

    // Proceed with deletion only if author has no books
    if (books.length === 0) {
      this.authorStorageService.deleteAuthor(toBeRemoved);
      return toBeRemoved;
    }

    throw new InvalidAuthorDeleteException();
  }

  getBooks(id: string) {
    const author = this.authorStorageService.getAuthor(id);
    if (!author) {
      throw new AuthorNotFoundException({ authorId: id });
    }
    return this.authorshipStorageService.getAuthorshipsByAuthorId(id);
  }
}
