import React, { useEffect, useRef } from 'react';
import { useLocation } from "react-router-dom";
import PropTypes from 'prop-types';

import Card from 'src/containers/Card';
import SearchBar from 'src/containers/SearchBar';
import Filter from 'src/containers/Filter';
import MoreResults from 'src/containers/MoreResults';
import MapList from 'src/containers/MapList';
import img from 'src/assets/images/noActivities.svg';

import './style.scss';

// https://reactrouter.com/web/example/query-parameters
// A custom hook that builds on useLocation to parse
// the query string for you.
const useQuery = () => {
  return new URLSearchParams(useLocation().search);
}

const Search = ({
  activities,
  fetchActivitiesByLocalisation,
  fetchActivitiesByLocalisationAndSports,
  pageValue,
  count,
  loaded,
  userActivitiesIds,
  userActivitiesCreatorIds,
  paginationReset,
}) => {
  const query = useQuery();
  const queryString = query.get('query');
  const lat = query.get('lat');
  const lng = query.get('lng');
  const sports = query.get('sports');

  useEffect(() => {
    window.scrollTo(0, 0);
    paginationReset();
  }, []);

  useEffect(() => {
    if (sports) {
      fetchActivitiesByLocalisationAndSports({ queryString, lat, lng, sports });
    } else {
      fetchActivitiesByLocalisation({ queryString, lat, lng });
    }
  }, [lat, lng, queryString, sports, pageValue]);

  const cardsCreated = [];
  activities.forEach((card) => {
    if (userActivitiesCreatorIds.includes(card.id)) {
      cardsCreated.push(
        <Card key={`card-${card.id}`} card={card} userCard={2} />,
      );
    } else if (userActivitiesIds.includes(card.id)) {
      cardsCreated.push(
        <Card key={`card-${card.id}`} card={card} userCard={1} />,
      );
    } else {
      cardsCreated.push(
        <Card key={`card-${card.id}`} card={card} userCard={0} />,
      );
    }
  });

  const filter = useRef(null);
  const scrollToFilter = () => {
    filter.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="home search">
      <SearchBar />

      {loaded && (
        <>
          <h2 ref={filter} className="heading-2">
            Dernières activités proche de :{' '}
            <span className="heading-2__txt-color">{query.get('query')}</span>
          </h2>
          <Filter />

          {cardsCreated.length > 0 && (
            <MapList lat={lat} lng={lng} scrollToFilter={scrollToFilter} />
          )}

          {cardsCreated.length > 0 && (
            <section className="container cards">{cardsCreated}</section>
          )}

          {cardsCreated.length === 0 && (
            <>
              <div className="search__no-result">
                Désolé aucune activité trouvée{' '}
              </div>
              <img
                src={img}
                alt="pas d'activites"
                className="search__no-result-img"
              />
            </>
          )}

          {activities.length < count - 1 ? <MoreResults /> : <></>}
        </>
      )}
    </main>
  );
};

Search.propTypes = {
  activities: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  fetchActivitiesByLocalisation: PropTypes.func.isRequired,
  fetchActivitiesByLocalisationAndSports: PropTypes.func.isRequired,
  userActivitiesIds: PropTypes.array.isRequired,
};

export default Search;
