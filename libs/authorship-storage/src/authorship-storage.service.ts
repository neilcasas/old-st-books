import { Injectable } from '@nestjs/common';
import { Authorship } from 'libs/types';
import { v4 as uuidv4 } from 'uuid';

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

  getAuthorship({ bookId, authorId }: { bookId: string; authorId: string }) {
    if (bookId && authorId) {
      return this.authorship.find(
        (record) => record.bookId === bookId && record.authorId === authorId,
      );
    }
  }

  getAuthorshipsByBookId(bookId: string) {
    return this.authorship.filter((record) => record.bookId === bookId);
  }

  getAuthorshipsByAuthorId(authorId: string) {
    return this.authorship.filter((record) => record.authorId === authorId);
  }

  link(bookId: string, authorId: string) {
    const record: Authorship = {
      id: uuidv4(),
      bookId: bookId,
      authorId: authorId,
    };
    this.authorship.push(record);
    return record;
  }

  unlink(record: Authorship) {
    this.authorship = this.authorship.filter(
      (authorship) => authorship.id !== record.id,
    );
  }
}
