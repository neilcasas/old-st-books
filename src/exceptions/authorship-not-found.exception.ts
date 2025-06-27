import { NotFoundException } from '@nestjs/common';

export class AuthorshipNotFoundException extends NotFoundException {
  constructor(bookId: string, authorId: string) {
    super(`Authorship record with bookk id ${bookId} and author id ${authorId} not found.`);
  }
}
