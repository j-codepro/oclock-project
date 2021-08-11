import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const MoreResults = ({ onClickButton }) => (
  <div className="more-results">
    <button className="more-results__button" onClick={onClickButton}>Plus de résultats</button>
  </div>
);

MoreResults.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};

export default MoreResults;
