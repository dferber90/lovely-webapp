/* eslint-env jest */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  getUserId,
  createToken,
  comparePasswords,
  hashPassword,
  prismaOptions,
} from './utils';

jest.mock('jsonwebtoken', () => ({
  verify: jest.fn(),
  sign: jest.fn(),
}));
jest.mock('bcryptjs', () => ({
  compare: jest.fn(),
  hash: jest.fn(),
}));

describe('getUserId', () => {
  describe('when auth information is in Authorization header', () => {
    describe('when it is prefixed with Bearer', () => {
      let result;
      beforeEach(() => {
        jwt.verify.mockImplementation(() => ({ userId: 'user-id' }));
        result = getUserId({ request: { get: () => 'Bearer some-token' } });
      });
      it('should call jwt verify with Authorization', () => {
        expect(jwt.verify).toHaveBeenCalledWith(
          'some-token',
          process.env.API_TOKEN_SECRET
        );
      });
      it('should return something', () => {
        expect(result).toEqual('user-id');
      });
    });
    describe('when it is not prefixed', () => {
      describe('when it is prefixed with Bearer', () => {
        let result;
        beforeEach(() => {
          jwt.verify.mockImplementation(() => ({ userId: 'user-id' }));
          result = getUserId({ request: { get: () => 'some-token' } });
        });
        it('should call jwt verify with Authorization', () => {
          expect(jwt.verify).toHaveBeenCalledWith(
            'some-token',
            process.env.API_TOKEN_SECRET
          );
        });
        it('should return something', () => {
          expect(result).toEqual('user-id');
        });
      });
    });
  });
});

describe('createToken', () => {
  let result;
  beforeEach(() => {
    jwt.sign.mockImplementation(() => 'some-token');
    result = createToken('user-id', 'app-secret');
  });
  it('should call jwt.sign', () => {
    expect(jwt.sign).toHaveBeenCalledWith({ userId: 'user-id' }, 'app-secret');
  });
  it('should return a token', () => {
    expect(result).toEqual('some-token');
  });
});

describe('comparePasswords', () => {
  beforeEach(() => {
    bcrypt.compare.mockImplementation((a, b) => a === b);
  });
  describe('when password is valid', () => {
    let result;
    beforeEach(() => {
      result = comparePasswords('a', 'a');
    });
    it('should forward the arguments', () => {
      expect(bcrypt.compare).toHaveBeenCalledWith('a', 'a');
    });
    it('should return true', () => {
      expect(result).toBe(true);
    });
  });
  describe('when password is invalid', () => {
    let result;
    beforeEach(() => {
      result = comparePasswords('a', 'b');
    });
    it('should forward the arguments', () => {
      expect(bcrypt.compare).toHaveBeenCalledWith('a', 'b');
    });
    it('should return false', () => {
      expect(result).toBe(false);
    });
  });
});

describe('hashPassword', () => {
  let result;
  beforeEach(() => {
    bcrypt.hash.mockImplementation(() => 'hashed-password');
    result = hashPassword('foo');
  });
  it('should call bcrypt.hash', () => {
    expect(bcrypt.hash).toHaveBeenCalledWith('foo', 10);
  });
  it('should return a hashed password', () => {
    expect(result).toEqual('hashed-password');
  });
});

describe('prismaOptions', () => {
  it('should have them', () => {
    expect(prismaOptions).toEqual({
      typeDefs: './generated/prisma.graphql',
      endpoint: process.env.PRISMA_ENDPOINT,
      secret: process.env.PRISMA_SECRET,
      debug: true,
    });
  });
});
