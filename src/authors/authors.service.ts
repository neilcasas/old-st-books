import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorsStorageService } from '@app/authors-storage';


@Injectable()
export class AuthorsService {
  constructor(private readonly authorStorageService: AuthorsStorageService) { }

  create(createAuthorDto: CreateAuthorDto) {
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
    return this.authorStorageService.deleteAuthor(id);
  }

  /*
  getBooks(id: string) {
    return this.authorStorageService.getBooksFromAuthor(id);
  }
  */
}
