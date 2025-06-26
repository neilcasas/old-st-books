import { ForbiddenException, HttpStatus } from '@nestjs/common';

export class InvalidAuthorDeleteException extends ForbiddenException {
  constructor() {
    (super({
      error: 'Invalid delete error',
      message: 'Cannot delete author with books',
    }),
      HttpStatus.FORBIDDEN);
  }
}
