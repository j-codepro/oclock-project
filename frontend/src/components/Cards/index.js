// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

// == Import
import Card from 'src/containers/Card';
import MoreResults from 'src/containers/MoreResults';

import './style.scss';

// == Composant

const Cards = ({
  count,
  activities,
  userActivitiesIds,
  userActivitiesCreatorIds,
  isLogged,
}) => {

  const cardsCreated = [];
  if ((!isLogged && activities) || (isLogged && activities && userActivitiesIds)) {
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
  }

  return (
    <>
      <section className="container cards">{cardsCreated}</section>
      {count-1 > cardsCreated.length ? <MoreResults /> : <></>}
    </>
  );
};

Cards.propTypes = {
  count: PropTypes.number,
  activities: PropTypes.array.isRequired,
  userActivitiesIds: PropTypes.array.isRequired,
  userActivitiesCreatorIds: PropTypes.array.isRequired,
  isLogged: PropTypes.bool,
};

Cards.defaultProps = {
  isLogged: false,
};

// == Export
export default Cards;
