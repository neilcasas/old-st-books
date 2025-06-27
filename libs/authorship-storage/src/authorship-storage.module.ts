import { Module } from '@nestjs/common';
import { AuthorshipStorageService } from './authorship-storage.service';

@Module({
  providers: [AuthorshipStorageService],
  exports: [AuthorshipStorageService],
})
export class AuthorshipStorageModule {}
