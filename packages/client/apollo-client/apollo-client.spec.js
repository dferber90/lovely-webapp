/* eslint-env jest */
import { apolloClient } from './apollo-client';

jest.mock('apollo-link-http');

describe('apolloClient', () => {
  it('should be exported', () => {
    expect(apolloClient).not.toBeUndefined();
  });
});
