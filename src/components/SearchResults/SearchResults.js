import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const SearchResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  width: 90vw;
  margin-top: 50px;
  column-gap: 1em;
`;

const ResultTitleLink = styled.a`
  color: #2769CF;
  overflow-wrap: break-word;
`;

const ResultFullName = styled.p`
  font-size: 0.8em;
  font-weight: 700;
  overflow-wrap: break-word;
  margin: 2px 0 0 0;
`;

const ResultDescription = styled.p`
  font-size: 0.8em;
  overflow-wrap: break-word;
  margin-top: 2px;
`;

const SearchResults = ({ searchResults, searchCategory }) => {
  const renderSearchResults = searchResults.length > 0 ? searchResults.map(result => {
    return searchCategory === 'repo' ? (
      <div key={result.node_id}>
        <ResultTitleLink href={result.html_url} target='_blank'>{result.name}</ResultTitleLink>
        <ResultFullName>{result.full_name}</ResultFullName>
        <ResultDescription>{result.description}</ResultDescription>
      </div>
    ) : (
        <div key={result.node_id}>
          <ResultTitleLink href={result.html_url} target='_blank'>{result.login}</ResultTitleLink>
        </div>
      )
  }) : null;
  return (
    <SearchResultsGrid>
      {renderSearchResults}
    </SearchResultsGrid>
  );
}

SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  searchCategory: PropTypes.string.isRequired
};

SearchResults.defaultProps = {
  searchResults: [],
  searchCategory: 'repo'
}

export default SearchResults;