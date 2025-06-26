import { NotFoundException } from '@nestjs/common';

export class AuthorNotFoundException extends NotFoundException {
  constructor({ authorId, name }: { authorId?: string, name?: { firstName: string, lastName: string } }) {
    if (authorId) {
      super(`Author with ID "${authorId}" not found.`);
    } else if (name) {
      super(`Author not found with ${name}.`)
    } else {
      super(`Author not found.`)
    }
  }
}
