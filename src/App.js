import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import AutocompleteSearch from './components/AutocompleteSearch';
import SearchResults from './components/SearchResults';
import styled from 'styled-components';

const AppWrapper = styled.div`
  font-family: 'Open Sans', sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledHeader = styled.h1`
  font-weight: 500;
  font-size: 1.3em;
  margin: 40px 20px;
`;

class App extends Component {
  state = {
    searchTerm: '',
    autocompleteSuggestions: [],
    searchResults: []
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
    this.debouncedGetAutocompleteSuggestions(event.target.value);
  }

  getAutocompleteSuggestions = (input) => {
    axios.get(`https://api.github.com/search/repositories?q=${input}+in:name&sort=stars&order=desc&per_page=10`)
      .then(res => {
        this.setState({
          autocompleteSuggestions: res.data.items
        });
      });
  }

  getSearchResults = () => {
    const { searchTerm } = this.state;
    axios.get(`https://api.github.com/search/repositories?q=${searchTerm}+in:name&sort=stars&order=desc`)
      .then(res => {
        this.setState({
          searchResults: res.data.items
        });
      });
  }

  debouncedGetAutocompleteSuggestions = _.debounce((input) => { this.getAutocompleteSuggestions(input) }, 500); //github search api will only be called 500ms after user finishes input

  render() {
    const { searchTerm, autocompleteSuggestions, searchResults } = this.state;
    return (
      <AppWrapper>
        <StyledHeader>Github Autocomplete Search</StyledHeader>
        <AutocompleteSearch
          handleSearchChange={this.handleSearchChange}
          searchTerm={searchTerm}
          autocompleteSuggestions={autocompleteSuggestions}
          getSearchResults={this.getSearchResults}
        />
        <SearchResults searchResults={searchResults} />
      </AppWrapper>
    );
  }
}

export default App;
