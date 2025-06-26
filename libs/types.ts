export enum Genre {
  Fiction = 'fiction',
  NonFiction = 'non-fiction',
  Fantasy = 'fantasy',
  Mystery = 'mystery',
  SciFi = 'sci-fi',
  Romance = 'romance',
  Horror = 'horror',
  Adventure = 'adventure',
  Educational = 'educational',
}

export type Book = {
  id: string;
  name: string;
  pages: number;
  genre: Genre[];
};

export type Author = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Authorship = {
  id: string;
  bookId: string;
  authorId: string;
};
