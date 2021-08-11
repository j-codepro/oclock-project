// == Import npm
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import ReactMapboxGl, { Marker } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import Messages from 'src/containers/Messages';

// == Import
import './style.scss';
import userIcon from 'src/assets/icons/account_circle.svg';
import pin from 'src/assets/icons/pin.svg';
import sports from 'src/components/Card/sports';

const Map = ReactMapboxGl({
  accessToken:
    'pk.eyJ1IjoicnVzc29iZW5qYW1pbiIsImEiOiJja205OGxjNngxZm52MnFqeGk1MmwyajJrIn0.M7PtoR3vltTPsc7q-4QDkg',
});

const Details = ({
  activity,
  userActivities,
  fetchDataActivity,
  onClickJoin,
  onClickQuit,
}) => {

  let currentSport = '';
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDataActivity(id);
  }, []);

  // console.log('activity.id -----> ', activity.id );
  // console.log(userActivities);
  // console.log(activity);

  const alreadyJoin = userActivities.find(
    (userActivity) => userActivity.id === activity.id,
  );

  // console.log(alreadyJoin);
  
  if (activity.sport) {
    currentSport = sports[activity.sport.icon];
  }

  return (
    <>
      
        {activity.id && (
          <>
            <main
              className="activity"
              style={{
                backgroundImage: `url(${currentSport})`,
              }}
            >
            <section className="activity__header">
              <h1 className="activity__title">{activity.title}</h1>
              <p className="activity__timeplace">
                Le {activity.date} à {activity.time} à{' '}
                {activity.activity_place.city}
              </p>
              <p className="activity__duration">Durée : {activity.duration}</p>
              {alreadyJoin && (
                <button
                  type="button"
                  className={`activity__join activity__join-quit activity__join-${activity.classname}`}
                  onClick={onClickQuit}
                >
                  {activity.errorMessage} {activity.quitMessage}
                </button>
              )}
              {!alreadyJoin && (
                <button
                  type="button"
                  className={`activity__join activity__join-${activity.classname}`}
                  onClick={onClickJoin}
                >
                  {activity.errorMessage} {activity.joinMessage}
                </button>
              )}
            </section>

            <section className="activity__details">
              <div className="activity__description">
                <h2 className="activity__descriptionTitle">Description :</h2>
                <p>{activity.description}</p>
              </div>
              <div className="activity__creator">
                <img
                  src={userIcon}
                  className="activity__userIcon"
                  alt="user icon"
                />
                <div className="activity__container">
                  <p className="activity__pseudo">{activity.creator.pseudo}</p>
                  <p className="activity__role">Créateur</p>
                </div>
              </div>
              <div className="activity__participants">
                <img
                  src={userIcon}
                  className="activity__participantsIcon"
                  alt="participants icon"
                />
                <div className="activity__container">
                  <p className="activity__participantsNumber">
                    {activity.participant_count} participant(s)
                  </p>
                  <p className="activity__minParticipants">
                    Participants minimum : {activity.min_participant}
                  </p>
                </div>
              </div>
            </section>

            </main>

            <div className="activity__map-messages">
              <Map
                center={[activity.activity_place.lng, activity.activity_place.lat]}
                zoom={[17]}
                style="mapbox://styles/mapbox/streets-v11"
                className="activity__map"
              >
                <Marker
                  coordinates={[
                    activity.activity_place.lng,
                    activity.activity_place.lat,
                  ]}
                  anchor="bottom"
                >
                  <img src={pin} alt="pin on map" className="activity__pin" />
                </Marker>
                {/* <Layer
                    type="symbol"
                    layout={{ 'icon-image': 'harbor-15' }}
                    wrapped
                  >
                    <Feature coordinates={[activity.activity_place.lng, activity.activity_place.lat]} />
                  </Layer> */}
              </Map>
              <Messages activityId={activity.id} />
            </div>

        </>
      )}

</>
  )

}

Details.propTypes = {
  activity: PropTypes.object.isRequired,
  fetchDataActivity: PropTypes.func.isRequired,
  onClickJoin: PropTypes.func.isRequired,
  onClickQuit: PropTypes.func.isRequired,
  userActivities: PropTypes.array.isRequired,
};

export default Details;
