import { NotFoundException } from 'src/app/exception/not.found.exception';

describe('NotFoundException', () => {
  it('should create an exception with default message', () => {
    const exception = new NotFoundException();
    expect(exception.message).toBe('Not Found');
    expect(exception.getStatus()).toBe(404);
  });

  it('should create an exception with custom message', () => {
    const exception = new NotFoundException('Farmer not found');
    expect(exception.message).toBe('Farmer not found');
    expect(exception.getStatus()).toBe(404);
  });
});