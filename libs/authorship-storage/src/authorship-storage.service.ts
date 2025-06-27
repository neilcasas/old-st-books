import { Injectable } from '@nestjs/common';
import { Authorship } from 'libs/types';
import { v4 as uuidv4 } from 'uuid';
import { DuplicateRecordException } from 'src/exceptions/duplicate-record.exception';

@Injectable()
export class AuthorshipStorageService {
  // Represents the joint table between author and books
  private authorship: Authorship[] = [
    {
      id: 'test-link-1',
      bookId: 'test-book-1',
      authorId: 'test-author-1',
    },
    {
      id: 'test-link-2',
      bookId: 'test-book-1',
      authorId: 'test-author-2',
    },
    {
      id: 'test-link-3',
      bookId: 'test-book-2',
      authorId: 'test-author-3',
    },
  ];

  getAuthorships() {
    return this.authorship;
  }

  getAuthorshipsByBookId(bookId: string) {
    return this.authorship.filter((record) => record.bookId === bookId);
  }

  getAuthorshipsByAuthorId(authorId: string) {
    return this.authorship.filter((record) => record.authorId === authorId);
  }

  link(bookId: string, authorId: string) {
    const duplicate = this.authorship.find(
      (record) => record.bookId === bookId && record.authorId === authorId,
    );
    if (duplicate) {
      throw new DuplicateRecordException();
    }
    const record: Authorship = {
      id: uuidv4(),
      bookId: bookId,
      authorId: authorId,
    };
    this.authorship.push(record);
    return record;
  }

  unlink(bookId: string, authorId: string) {
    const record = this.authorship.find(
      (record) => record.bookId === bookId && record.authorId === authorId,
    );
    if (record) {
      this.authorship = this.authorship.filter(
        (authorship) => authorship.id !== record.id,
      );
    }
    return record;
  }

  removeAllByBookId(bookId: string) {
    this.authorship = this.authorship.filter(
      (record) => record.bookId !== bookId,
    );
  }

  removeAllByAuthorId(authorId: string) {
    this.authorship = this.authorship.filter(
      (record) => record.authorId !== authorId,
    );
  }
}
