import { BadRequestException } from 'src/app/exception/bad.request.exception';

describe('BadRequestException', () => {
  it('should create an exception with default message', () => {
    const exception = new BadRequestException();
    expect(exception.message).toBe('Bad Request');
    expect(exception.getStatus()).toBe(400);
  });

  it('should create an exception with custom message', () => {
    const exception = new BadRequestException('Invalid data');
    expect(exception.message).toBe('Invalid data');
    expect(exception.getStatus()).toBe(400);
  });
});