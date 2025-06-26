import { HttpException, HttpStatus } from "@nestjs/common";

export class DuplicateRecordException extends HttpException {
  constructor() {
    super({
      error: "Duplicate record error",
      message: "Record already exists.",
    }, HttpStatus.FORBIDDEN)
  }
}
