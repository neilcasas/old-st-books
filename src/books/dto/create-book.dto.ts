import { ArrayNotEmpty, IsArray, IsEnum, IsInt, IsString, IsUUID, MinLength, } from "class-validator";
import { Genre } from "libs/types";

export class CreateBookDto {
  @MinLength(3)
  name: string;

  @IsInt()
  pages: number;

  @IsArray()
  @IsEnum(Genre, { each: true })
  @ArrayNotEmpty()
  genre: Genre[];
}
