import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import AutocompleteSearch from './components/AutocompleteSearch/AutocompleteSearch';
import SearchResults from './components/SearchResults/SearchResults';
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

StyledHeader.displayName = 'StyledHeader';
class App extends Component {
  state = {
    searchTerm: '',
    searchCategory: 'repo',
    autocompleteSuggestions: [],
    searchResults: []
  }

  /*
  * handleSearchChange
  * Handles changes to search bar input and updates searchTerm state
  * Upon updating searchTerm, debouncedGetAutocompleteSuggestions will be called  
  */
  handleSearchChange = event => {
    this.setState({
      searchTerm: event.target.value
    });
    this.debouncedGetAutocompleteSuggestions();
  }

  /*
  * handleSelectChange
  * Handles selection of select element. Whenever a new selection is made, autocomplete suggestions and search results will be reset
  */
  handleSelectChange = event => {
    this.setState({
      searchCategory: event.target.value,
      searchTerm: '',
      autocompleteSuggestions: [],
      searchResults: []
    });
  }

  /*
  * getAutocompleteSuggestions
  * Calls Github Search API and retrieves only top 10 results for autocomplete suggestions
  */
  getAutocompleteSuggestions = () => {
    const { searchTerm, searchCategory } = this.state;
    // retrieve only top 10 results for autocomplete suggestions
    const githubQuery = searchCategory === 'repo' ? `https://api.github.com/search/repositories?q=${searchTerm}+in:name&sort=stars&order=desc&per_page=10` : `https://api.github.com/search/users?q=${searchTerm}+in:login&per_page=10`;
    axios.get(githubQuery)
      .then(res => {
        this.setState({
          autocompleteSuggestions: res.data.items
        });
      });
  }

  /*
  * getSearchResults
  * Calls Github SearchRestrives all results to display upon submit
  */
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

  /*
  * debouncedGetAutocompleteSuggestions
  * Uses lodash debounce to call getAutocompleteSuggestions method 500ms after user finishes input
  */
  debouncedGetAutocompleteSuggestions = _.debounce(() => { this.getAutocompleteSuggestions() }, 500);

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
