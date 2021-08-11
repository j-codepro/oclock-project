/* eslint-disable arrow-body-style */
// == Import npm
import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { useHistory } from "react-router-dom";

// == Import
import './style.scss';

import pin from 'src/assets/icons/pin.svg';

// == Composant
const SearchBar = ({
  inputValue,
  listAutocompleteData,
  validLocalisation,
  changeValue,
  fetchPlacesAutoCompletion,
  fetchOnePlacesAutoCompletion,
  changeValidLocalisation,
  clearListAutocompleteData,
  errorLocalisation,
  searchQueryInProcess,
  changeSearchQueryInProcessStatut,
  showLoginModal,
  isLogged,
}) => {
  const timer = useRef(null);
  const placeInput = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // verification que la recherche vient bien d'être lancée après la verification des coordonnées grace à l'api stacklocation
    // searchQueryInProcess est à true si la lat et lng a bien été recupérée grace au midddleware et stockée dans le state
    if (searchQueryInProcess) {
      changeSearchQueryInProcessStatut();
      clearTimeout(timer.current);
      clearListAutocompleteData();
      history.push(
        `/search?lat=${validLocalisation.lat}&lng=${validLocalisation.lng}&query=${inputValue}`,
      );
    }

    // quant le component unmount clearTimeout : pour ne pas afficher l'autocompletion sur la page suivante :
    /*
    return () => {
      clearTimeout(timer.current);
    }
    */
  });

  const handleOnChange = (e) => {
    const value = e.target.value;
    changeValue(value);
    // timer pour déclencher le fetch après 1s sans onchange dans l'input
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      // pas de réponse api (https://positionstack.com/documentation) si <= 2
      // console.log('handleOnChange TIME');
      if (value.length > 2) {
        fetchPlacesAutoCompletion();
      } else {
        clearListAutocompleteData();
      }
    }, 500);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    clearTimeout(timer.current);
    if (inputValue.length > 2) {
      clearListAutocompleteData();
      fetchOnePlacesAutoCompletion();
    }
  };

  const handleClickItemAutocompletion = (index) => {
    clearTimeout(timer.current);
    changeValidLocalisation(index);
    clearListAutocompleteData();
    placeInput.current.focus();
  };

  const handleClickCreateActivity = (e) => {
    e.preventDefault();
    if(isLogged) {
      history.push(
        `/creation`,
      );
    } else {
      showLoginModal();
    }
  }

  return (
    <section className="searchbar">
        <form onSubmit={handleOnSubmit} className="searchbar__container">
          <input
            className="searchbar__input"
            type="text"
            placeholder="Cherche un lieu"
            value={inputValue}
            onChange={handleOnChange}
            ref={placeInput}
          />
          {listAutocompleteData.length > 0 && (
            <ul className="autocomplete">
              {listAutocompleteData.map((el, index) => {
                return (
                  <li
                    className="autocomplete__item"
                    onClick={() => handleClickItemAutocompletion(index)}
                    key={`${el.lat}${el.lng}${index}`}
                  >
                    {el.name},{' '}
                    <span className="autocomplete__detail">{el.reg}</span>
                  </li>
                );
              })}
            </ul>
          )}
          <img className="searchbar__icon" src={pin} alt="map pin" />
          <button className="searchbar__button" type="submit">
            Rechercher
          </button>
          {errorLocalisation && (
            <div className="searchbar__error">
              Localisation non trouvée, il faut que tu réessayes
            </div>
          )}
        </form>
        <p className="searchbar__spacer">OU</p>

        <button
          onClick={handleClickCreateActivity}
          className="searchbar__link"
        >
          Créer une activité
        </button>

    </section>
  );
};

SearchBar.propTypes = {
  inputValue: PropTypes.string,
  listAutocompleteData: PropTypes.array.isRequired,
  changeValue: PropTypes.func.isRequired,
  fetchPlacesAutoCompletion: PropTypes.func.isRequired,
  changeValidLocalisation: PropTypes.func.isRequired,
  clearListAutocompleteData: PropTypes.func.isRequired,
  fetchOnePlacesAutoCompletion: PropTypes.func.isRequired,
  changeSearchQueryInProcessStatut: PropTypes.func.isRequired,
  errorLocalisation: PropTypes.bool.isRequired,
  searchQueryInProcess: PropTypes.bool.isRequired,
  validLocalisation: PropTypes.object.isRequired,
};

SearchBar.defaultProps = {
  inputValue: '',
};

// == Export
export default SearchBar;
