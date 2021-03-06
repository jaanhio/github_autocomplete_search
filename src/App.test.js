import React from 'react';
import App from './App';
import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

describe('<App /> component', () => {

  it('renders <App /> component without throwing error', () => {
    const wrapper = shallow(<App />);
    const tree = toJson(wrapper);
    expect(tree).toMatchSnapshot();
  });

  it('should render 3 child components', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.children()).toHaveLength(3);
  });

  describe('Local state of App component', () => {

    it('initial search term to be empty', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.instance().state.searchTerm).toBe('');
    });

    it('initial search category to be repo', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.instance().state.searchCategory).toBe('repo');
    });

    it('initial autocomplete suggestions to be empty array', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.instance().state.autocompleteSuggestions === []);
    });

    it('initial search results to be empty array', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.instance().state.searchResults === []);
    });
  });

  describe('Methods of App component', () => {

    it('testFunction should return true', () => {
      const wrapper = shallow(<App />);
      expect(wrapper.instance().testFunction()).toEqual(true);
    });

    it('getSearchResults method', () => {
      const wrapper = shallow(<App />);
      const mock = new MockAdapter(axios);
      mock.onGet('https://api.github.com/search/repositories?q=express+in:name&sort=stars&order=desc')
        .reply(200);
      axios.get('https://api.github.com/search/repositories?q=express+in:name&sort=stars&order=desc')
        .then((res) => {
          expect(res).toBeDefined();
        });
    });
  });
});