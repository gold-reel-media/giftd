import React from 'react';
import { shallow } from 'enzyme';
import Main from './Main';

describe('Main', () => {
  it('should render a <div />', () => {
    const wrapper = shallow(<Main />);
    expect(wrapper.find('div').length).toEqual(1);
  });
});