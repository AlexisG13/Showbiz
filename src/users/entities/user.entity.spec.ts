import { User } from './users.entity';
import * as bcrypt from 'bcrypt';

describe('User entity', () => {
  let user: User;
  const clone = Object.assign(bcrypt);
  beforeEach(() => {
    user = new User();
    user.password = 'testPassword';
    user.salt = 'testSalt';
    clone.hash = jest.fn();
  });

  describe('validatePassword', () => {
    it('returns true as password is valid', async   () => {
      (clone.hash as jest.Mock).mockReturnValue('testPassword');
      const result = await user.validatePassword('1234');
      expect(result).toEqual(true);
    });
  });
});
