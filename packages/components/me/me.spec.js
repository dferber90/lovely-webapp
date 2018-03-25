/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { Query } from 'react-apollo';
import { Me } from './me';

describe('Me', () => {
  let render;
  let wrapper;
  beforeEach(() => {
    render = jest.fn();
    wrapper = shallow(<Me>{render}</Me>);
  });

  describe('Query', () => {
    it('should get rendered', () => {
      expect(wrapper.find(Query)).toExist();
    });
    it('should have a query prop', () => {
      expect(wrapper.find(Query)).toHaveProp('query', expect.any(Object));
    });
  });
});
