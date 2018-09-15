/* eslint-env jest */
import React from 'react';
import { render, waitForElement } from 'react-testing-library'
import { MockedProvider } from 'react-apollo/test-utils';
import { Me, LOGGED_IN_USER_QUERY } from './me';

const mocks = [
  {
    request: { query: LOGGED_IN_USER_QUERY },
    result: { data: { me: { id: '1', name: 'Tom Lovely' } } },
  },
];

describe('Me', () => {
  it('should get rendered', async () => {
    const renderProp = jest.fn((props) => !props.loading && <div data-testid="loaded" />)
    const queries = render(<MockedProvider addTypename={false} mocks={mocks}><Me>{renderProp}</Me></MockedProvider>);
    expect(renderProp).toHaveBeenCalledWith({
      error: undefined,
      loading: true,
      me: undefined,
    })
    await waitForElement(() =>queries.getByTestId('loaded'))
    expect(renderProp).toHaveBeenCalledTimes(2)
    expect(renderProp).toHaveBeenCalledWith({
      error: undefined,
      loading: false,
      me: expect.objectContaining({ id: '1', name: 'Tom Lovely' }),
    })
  });
});
