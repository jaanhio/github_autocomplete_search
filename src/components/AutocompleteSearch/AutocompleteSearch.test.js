import React from 'react';
import AutocompleteSearch from './AutocompleteSearch';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';


describe('<AutocompleteSearch /> component', () => {
  it('render without throwing error', () => {
    const wrapper = shallow(<AutocompleteSearch />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
  describe('Search input box placeholder message', () => {
    it('renders default repo placeholder message', () => {
      const wrapper = shallow(<AutocompleteSearch />);
      const searchInputComponent = wrapper.props().children[1];
      expect(searchInputComponent.props.placeholder).toEqual('Find Github repo (e.g express)');
    });
    it('renders user placeholder message if search category is selected', () => {
      const searchCategory = 'user';
      const wrapper = shallow(<AutocompleteSearch searchCategory={searchCategory} />);
      const searchInputComponent = wrapper.props().children[1];
      expect(searchInputComponent.props.placeholder).toEqual('Find Github user');
    });
  });
  describe('Search category select element', () => {
    it('renders 2 options in search category select element ', () => {
      const wrapper = shallow(<AutocompleteSearch />);
      const selectComponent = wrapper.props().children[0];
      expect(selectComponent.props.children.length).toEqual(2);
    });
    it('updates searchCategory state/props on change', () => {
      const wrapper = shallow(<AutocompleteSearch />);
      // console.log(wrapper.props());
    });
  });
  describe('Search button', () => {
    it('gets results on click', );
    const wrapper = mount(<AutocompleteSearch />);
    console.log(wrapper.children());
  });
});