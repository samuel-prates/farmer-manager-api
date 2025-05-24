import { ConflictException } from 'src/app/exception/conflict.exception';

describe('ConflictException', () => {
  it('should create an exception with default message', () => {
    const exception = new ConflictException();
    expect(exception.message).toBe('Conflict');
    expect(exception.getStatus()).toBe(409);
  });

  it('should create an exception with custom message', () => {
    const exception = new ConflictException('Already exists');
    expect(exception.message).toBe('Already exists');
    expect(exception.getStatus()).toBe(409);
  });
});