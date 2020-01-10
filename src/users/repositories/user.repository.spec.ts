import { Test } from '@nestjs/testing';
import { ConflictException } from '@nestjs/common';
import { UsersRepository } from './user.repository';

const user = {
  title: 'Test title',
  id: 0,
  description: 'Test description',
  poster: 'Test poster',
  stock: 0,
  trailer: 'Test trailer',
  salePrice: 0,
  tags: [],
  availability: false,
  validatePassword : jest.fn(),
};

const mockAuthCredentials = {
  username: 'Test username',
  password: 'Test password',
  email: 'Test email',
};

const mockLoginCredentials = {
  username: 'Test username',
  password: 'Test password',
};

const mockRole = {
  id: 0,
  title: 'client',
  users: [],
};

describe('UsersRepository', () => {
  let usersRepository: UsersRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [UsersRepository],
    }).compile();

    usersRepository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(usersRepository).toBeDefined();
  });

  describe('signUp', () => {
    beforeEach(() => {
      usersRepository.save = jest.fn().mockResolvedValue(user);
      const genSalt = jest.fn().mockResolvedValue('A salt');
      const hash = jest.fn().mockResolvedValue('A hashed password');
    });

    it('signs up an user', async () => {
      usersRepository.findOne = jest.fn().mockResolvedValue(null);
      const result = await usersRepository.signUp(mockAuthCredentials, mockRole);
      expect(result).toEqual(user);
    });

    it('throws an error if the movie already exists', async () => {
      usersRepository.findOne = jest.fn().mockResolvedValue(true);
      expect(usersRepository.signUp(mockAuthCredentials, mockRole)).rejects.toThrowError(
        ConflictException,
      );
    });
  });
});
