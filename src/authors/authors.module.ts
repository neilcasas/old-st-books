import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { StorageModule } from '@app/storage';

@Module({
  imports: [StorageModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
})
export class AuthorsModule { }
