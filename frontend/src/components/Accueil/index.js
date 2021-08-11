import React, { useEffect } from 'react';
import Cards from 'src/containers/Cards';
import UserCards from 'src/containers/UserCards';
import SearchBar from 'src/containers/SearchBar';
import MoreResults from 'src/containers/MoreResults';
import img from 'src/assets/images/noActivities.svg';
import PropTypes from 'prop-types';

import './style.scss';

const Accueil = ({
  fetchLastActivities,
  isLogged,
  user,
  userActivities,
  points,
  registredActivities,
  myCreatedActivities,
  pageValue,
  paginationReset,
  fetchUserActivities, 
}) => {
    
  useEffect(() => {
    paginationReset();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    paginationReset();
    if (!isLogged) {
      fetchLastActivities();
    } else {
      fetchUserActivities();
    }
  }, [isLogged]);

  useEffect(() => {
    if (!isLogged) {
      fetchLastActivities();
    }
  }, [pageValue]);

  const mainClassName = isLogged
    ? 'home home--img home--logged'
    : 'home home--img';

  const displayUserInfo =
    myCreatedActivities > 0 || registredActivities > 0 || points > 0
      ? true
      : false;

  return (
    <main className={mainClassName}>
      {isLogged ? (
        <div className="hero hero--logged">
          <h1 className="hero__title">
            Hello <span className="hero__title-color">{user.pseudo}</span>
          </h1>

          {displayUserInfo && (
            <>
              <div className="hero__txt-user">
                {myCreatedActivities > 0 && (
                  <>
                    Tu as crée{' '}
                    <span className="hero__txt-user--green">
                      {myCreatedActivities} activité(s)
                    </span>
                    ,{' '}
                  </>
                )}
                {registredActivities > 0 && (
                  <>
                    tu es inscrit à{' '}
                    <span className="hero__txt-user--orange">
                      {registredActivities} activité(s)
                    </span>{' '}
                    !<br />
                  </>
                )}
                {points > 0 && (
                  <>
                    et gagné{' '}
                    <span className="hero__txt-user--orange">
                      {points} points
                    </span>{' '}
                    Fairplay !
                  </>
                )}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="hero">
          <h1 className="hero__title">
            <span className="hero__title-color">
              Rejoins les sportifs motivés
            </span>
            <br />
            de ton quartier
          </h1>
          <div className="hero__sub-title">
            Découvre et programme de nouvelles activités sportives autour de
            toi, booste ta motivation en groupe, avec des activités régulières !
          </div>
        </div>
      )}

      <SearchBar />

      {isLogged ? (
        <>
          {userActivities.length > 0 ? (
            <>
              <h2 className="heading-2">Mes prochaines activités :</h2>
              <UserCards />
            </>
          ) : (
            <>
              <div className="home__no-result">
                Encore inscris à aucune activité ?<br />
                <span className="home__no-result--color">Crées en une ou inscris toi vite !</span>
              </div>
              <img src={img} alt="pas d'activites" className="home__no-result-img"/>
            </>
          )}
        </>
      ) : (
        <>
          <h2 className="heading-2">
            Explore les dernières activités proposées :
          </h2>
          <Cards />
        </>
      )}
    </main>
  );
};

Accueil.propTypes = {
  fetchLastActivities: PropTypes.func.isRequired,
  fetchUserActivities: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired,
  points: PropTypes.number,
  
};

Accueil.defaultProps = {
  points: 0,
};

export default Accueil;
