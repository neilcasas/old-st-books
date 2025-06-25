export class CreateBookDto {
  id: string;
  name: string;
  pages: number;
  genre: string | string[];
}
