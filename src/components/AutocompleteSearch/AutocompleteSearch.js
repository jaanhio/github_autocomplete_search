import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

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

const StyledSelect = styled.select`
  height: 36px;
  font-size: 0.6em;
`;

const StyledInput = styled.input`
  width: 60vw;
  font-size: 1em;
  padding-left: 10px;
  max-width: 400px;
  border: 1px solid #CDCDCD;
  font-weight: 200;
`;

const AutocompleteSearch = ({ autocompleteSuggestions, handleSearchChange, handleSelectChange, searchTerm, searchCategory, getSearchResults }) => {

  const renderOptions = autocompleteSuggestions.map(suggestion => {
    return searchCategory === 'repo' ? (
      <option key={suggestion.node_id}>{suggestion.name}</option>
    ) : (<option key={suggestion.node_id}>{suggestion.login}</option>)
  });

  const placeholderMessage = searchCategory === 'repo' ? 'Find Github repo (e.g express)' : 'Find Github user';

  return (
    <SearchbarWrapper>
      <StyledSelect name='search-option' onChange={handleSelectChange}>
        <option value='repo'>Repository</option>
        <option value='user'>User</option>
      </StyledSelect>
      <StyledInput list='repoList' onChange={handleSearchChange} value={searchTerm} placeholder={placeholderMessage} />
      <datalist id='repoList'>
        {renderOptions}
      </datalist>
      <StyledButton onClick={getSearchResults}>
        <i className="material-icons" style={{ color: 'white' }}>search</i>
      </StyledButton>
    </SearchbarWrapper>
  )
}

AutocompleteSearch.propTypes = {
  autocompleteSuggestions: PropTypes.array.isRequired,
  handleSearchChange: PropTypes.func,
  handleSelectChange: PropTypes.func,
  searchTerm: PropTypes.string.isRequired,
  searchCategory: PropTypes.string.isRequired,
  getSearchResults: PropTypes.func
};

AutocompleteSearch.defaultProps = {
  autocompleteSuggestions: [],
  searchTerm: '',
  searchCategory: 'repo'
};

export default AutocompleteSearch;