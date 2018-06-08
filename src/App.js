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
    searchCategory: 'repo',
    autocompleteSuggestions: [],
    searchResults: []
  }

  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
    this.debouncedGetAutocompleteSuggestions(event.target.value);
  }

  handleSelectChange = event => { // handles selection of select element. whenever new selection is made, searchbar, autocomplete suggestions and search results will be reset
    this.setState({
      searchCategory: event.target.value,
      searchTerm: '',
      autocompleteSuggestions: [],
      searchResults: []
    });
  }


  getAutocompleteSuggestions = (input) => {
    const { searchCategory } = this.state;
    // retrieve only top 10 results for autocomplete suggestions
    const githubQuery = searchCategory === 'repo' ? `https://api.github.com/search/repositories?q=${input}+in:name&sort=stars&order=desc&per_page=10` : `https://api.github.com/search/users?q=${input}+in:login&per_page=10`;
    axios.get(githubQuery)
      .then(res => {
        this.setState({
          autocompleteSuggestions: res.data.items
        });
      });
  }

  getSearchResults = () => {
    const { searchTerm, searchCategory } = this.state;
    // retrieve all results to display upon submit
    const githubQuery = searchCategory === 'repo' ? `https://api.github.com/search/repositories?q=${searchTerm}+in:name&sort=stars&order=desc` : `https://api.github.com/search/users?q=${searchTerm}+in:login`
    axios.get(githubQuery)
      .then(res => {
        this.setState({
          searchResults: res.data.items
        });
      });
  }

  debouncedGetAutocompleteSuggestions = _.debounce((input) => { this.getAutocompleteSuggestions(input) }, 500); //github search api will only be called 500ms after user finishes input

  render() {
    const { searchTerm, searchCategory, autocompleteSuggestions, searchResults } = this.state;
    return (
      <AppWrapper>
        <StyledHeader>Github Autocomplete Search</StyledHeader>
        <AutocompleteSearch
          handleSearchChange={this.handleSearchChange}
          handleSelectChange={this.handleSelectChange}
          searchTerm={searchTerm}
          searchCategory={searchCategory}
          autocompleteSuggestions={autocompleteSuggestions}
          getSearchResults={this.getSearchResults}
        />
        <SearchResults
          searchResults={searchResults}
          searchCategory={searchCategory}
        />
      </AppWrapper>
    );
  }
}

export default App;
