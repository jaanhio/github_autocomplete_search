import React from 'react';
import styled from 'styled-components';

const SearchbarWrapper = styled.div`
  display: flex;
`;

const StyledButton = styled.button`
  height: 36px;
  display: flex;
  align-items: center;
  width: 60px;
  justify-content: center;
  background-color: #2769CF;
  border: none;
`;

const StyledInput = styled.input`
  width: 60vw;
  font-size: 1em;
  padding-left: 10px;
  max-width: 400px;
  border: 1px solid #CDCDCD;
  font-weight: 200;
`;

const AutocompleteSearch = ({ autocompleteSuggestions, handleSearchChange, searchTerm, getSearchResults }) => {

  const renderOptions = autocompleteSuggestions.map(suggestion => {
    return (
      <option key={suggestion.node_id}>{suggestion.name}</option>
    );
  });

  return (
    <SearchbarWrapper>
      <select name='search-option'>
        <option value='1'>Repository</option>
        <option value='2'>User</option>
      </select>
      <StyledInput list='repoList' onChange={handleSearchChange} value={searchTerm} placeholder='Find Github repo (e.g express)' />
      <datalist id='repoList'>
        {renderOptions}
      </datalist>
      <StyledButton onClick={getSearchResults}>
        <i class="material-icons" style={{ color: 'white' }}>search</i>
      </StyledButton>
    </SearchbarWrapper>
  )
}

export default AutocompleteSearch;