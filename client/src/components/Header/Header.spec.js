import React from 'react';
import { shallow } from 'enzyme';
import Header from './Header';

describe('Header', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});
