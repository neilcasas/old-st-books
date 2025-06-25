import { Injectable } from '@nestjs/common';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { StorageService } from '@app/storage';

@Injectable()
export class AuthorsService {
  constructor(private readonly storageService: StorageService) { }

  create(createAuthorDto: CreateAuthorDto) {
    return this.storageService.createAuthor(createAuthorDto.name);
  }

  findAll() {
    return this.storageService.getAuthors();
  }

  findOne(id: string) {
    return this.storageService.getAuthor(id);
  }

  update(id: string, updateAuthorDto: UpdateAuthorDto) {
    return this.storageService.updateAuthor(id, updateAuthorDto);
  }

  remove(id: string) {
    return this.storageService.deleteAuthor(id);
  }

  getBooks(id: string) {
    return this.storageService.getBooksFromAuthor(id);
  }
}
