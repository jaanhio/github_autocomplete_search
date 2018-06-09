import React from 'react';
import SearchResults from './SearchResults';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { mockRepoResults, mockUserResults } from './mockResults';

describe('<SearchResults /> component', () => {
  it('render without throwing error', () => {
    const wrapper = shallow(<SearchResults />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });
  it('renders null with empty searchResults array props', () => {
    const wrapper = shallow(<SearchResults />);
    expect(wrapper.props().children).toEqual(null);
  });
  it('renders repo searchResults correctly', () => {
    const wrapper = shallow(<SearchResults searchResults={mockRepoResults} />);
    const mockResultComponent = wrapper.props().children[0].props;
    expect(mockResultComponent.children.length).toEqual(3);
  });
  it('renders user searchResults correctly', () => {
    const wrapper = shallow(<SearchResults searchResults={mockUserResults} searchCategory='user' />);
    const mockResultComponent = wrapper.props().children[0].props;
    expect(mockResultComponent.children).toBeDefined();
  });
});