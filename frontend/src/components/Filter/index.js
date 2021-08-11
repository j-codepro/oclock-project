import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import { useHistory } from "react-router-dom";

import './style.scss';

import sports from '../Card/sports';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Filter = ({ fetchFilterSportsByLocalisation, sportsList }) => {

  const [sportsFilter, setSportsFilter] = useState([]);

  const history = useHistory();

  const query = useQuery();
  const queryString = query.get("query");
  const lat = query.get("lat");
  const lng = query.get("lng");

  // check si sports ids dans url pour bien les selectionner sur une nouvelle recherche ou refresh
  let querySports = query.get("sports");
  if(querySports) { querySports.split(',') }

  useEffect(() => {
    // console.log('fetchFilterSportsByLocalisation');
    fetchFilterSportsByLocalisation({lat, lng});
  }, [lat, lng])

  useEffect(() => {
    setSportsFilter (
      sportsList.map(sport => {
        const updatedSport = {
          ...sport,
          isChecked: false,
        }
        if(querySports && querySports.includes(sport.id)) {
          updatedSport.isChecked = true;
        }
        return updatedSport;
      })
    )
  }, [sportsList])

  const handleCheck = (index) => {
    // console.log('handleCheck');
    const updatedSport = [...sportsFilter];
    if(updatedSport[index].isChecked) {
      updatedSport[index].isChecked = false;
    } else {
      updatedSport[index].isChecked = true;
    }
    setSportsFilter(updatedSport)
  }

  const handleOnClick = () => {
    // console.log('handleOnClick');
    const selectedSportIds = [];
    sportsFilter.forEach(sport => {
      if(sport.isChecked === true) {
        selectedSportIds.push(sport.id); 
      }
    });
    // console.log(selectedSportIds.join(','));
    history.push(`/search?lat=${lat}&lng=${lng}&sports=${selectedSportIds.join(',')}&query=${queryString}`);
  }
  
  return (
    <>
    {sportsFilter.length > 0 && (
      <div className="filter">
        {sportsFilter.map((sport, index) => ( 
          <div className="filter__item" key={`sport${sport.id}`}>
            <input
              type="checkbox" 
              name={`sport${sport.id}`} 
              id={`sport${sport.id}`} 
              className="filter__checkbox"
              checked={sport.isChecked}
              onChange={() => handleCheck(index)}
            />
            <label htmlFor={`sport${sport.id}`} className="filter__label">
              <img src={sports[sport.icon]} alt="" className="filter__picture" />
              <div className="filter__item-txt">{sport.name}</div>
            </label>
          </div>
        ))}
        <div className="filter__actions">
          <button
            className="filter__button"
            onClick={handleOnClick}
          >filtrer</button>
        </div>
      </div>
    )}
    </>
  )
};

Filter.propTypes = {
  fetchFilterSports: PropTypes.func.isRequired,
  sportsList: PropTypes.array.isRequired,
};

export default Filter;
