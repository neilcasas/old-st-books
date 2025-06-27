import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { AuthorshipStorageModule } from '@app/authorship-storage';
import { AuthorsStorageModule } from '@app/authors-storage';

@Module({
  imports: [AuthorshipStorageModule, AuthorsStorageModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule { }
