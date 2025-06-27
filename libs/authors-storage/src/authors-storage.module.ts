import { Module } from '@nestjs/common';
import { AuthorsStorageService } from './authors-storage.service';

@Module({
  providers: [AuthorsStorageService],
  exports: [AuthorsStorageService],
})
export class AuthorsStorageModule {}
