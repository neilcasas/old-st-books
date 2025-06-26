import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe } from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) { }

  @Post()
  create(@Body(new ValidationPipe()) createBookDto: CreateBookDto) {
    return this.booksService.create(createBookDto);
  }

  @Get()
  findAll() {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.booksService.remove(id);
  }

  @Get(':id/authors')
  getAuthors(@Param('id') id: string) {
    return this.booksService.getAuthors(id);
  }

  @Post(':book_id/authors')
  linkAuthor(@Param('book_id') bookId: string, @Body() author: { author_id: string }) {
    return this.booksService.linkAuthor(bookId, author.author_id);
  }

  @Delete(':book_id/authors')
  unlinkAuthor(@Param('book_id') bookId: string, @Body() author: { author_id: string }) {
    return this.booksService.removeLink(bookId, author.author_id);
  }
}
