import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictException extends HttpException {
  constructor(message?: string) {
    super(message || 'Conflict', HttpStatus.CONFLICT);
  }
}