import { NotFoundException } from '@nestjs/common';

export class BookNotFoundException extends NotFoundException {
  constructor({ bookId, name }: { bookId?: string; name?: string }) {
    if (bookId) {
      super(`Book with ID "${bookId}" not found.`);
    } else if (name) {
      super(`Book not found with ${name}.`);
    } else {
      super(`Book not found.`);
    }
  }
}
