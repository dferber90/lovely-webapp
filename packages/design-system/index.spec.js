/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import { NavLink } from 'rebass';
import { NavItem } from './index';

describe('NavItem', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<NavItem to="/foo" />);
  });

  it('should get NavLink', () => {
    expect(wrapper.find(NavLink)).toExist();
  });
});
