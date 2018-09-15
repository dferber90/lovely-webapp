/* eslint-env jest */
import React from 'react';
import {render} from 'react-testing-library'
import { MemoryRouter } from 'react-router-dom'
import { NavItem } from './index';

describe('NavItem', () => {
  it('should render a link', () => {
    const text = 'Bar'
    const queries = render(<MemoryRouter><NavItem to="/foo">{text}</NavItem></MemoryRouter>);
    expect(queries.getByText(text).nodeName).toBe('A')
  });
});
