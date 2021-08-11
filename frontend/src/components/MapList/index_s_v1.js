import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import ReactMapGL from 'react-map-gl';
import CustomMarker from './CustomMarker'; 

const MapList = ({ activities, lat, lng, userActivitiesIds, userActivitiesCreatorIds, scrollToFilter }) => {

  /*
  let cardClassName = 'card';
  if(userCard === 1) {
    cardClassName = 'card card--user';
  } else if(userCard === 2) {
    cardClassName = 'card card--user card--creator';
  }
  */

  // console.log(userActivitiesIds, userActivitiesCreatorIds);
  const [classNameMap, setClassNameMap] = useState('map-list')

  useEffect(() => {
    // console.log(activities);
  }, [activities])

  useEffect(() => {
    setViewport({
      latitude: parseFloat(lat),
      longitude: parseFloat(lng),
      zoom: 12,
    })
  }, [lat, lng])

  const [viewport, setViewport] = useState({
    latitude: parseFloat(lat),
    longitude: parseFloat(lng),
    zoom: 12,
  });

  const map = useRef(null);
  const [btOpenMapTxt, setbtOpenMapTxt] = useState('Voir sur la carte');
  
  const handleChangeMapSize = () => {
    // console.log('test');
    if(classNameMap === 'map-list') {
      map.current.scrollIntoView({behavior: "smooth"})  
      setClassNameMap('map-list map-list--open');
      setbtOpenMapTxt('Fermer la carte');
    } else {
      scrollToFilter();
      setClassNameMap('map-list');
      setbtOpenMapTxt('Voir sur la carte');
    }
  }
  
  return (
    <>
      {activities && (
        <div className={classNameMap} ref={map} >
          <button className="map-list__button-open" onClick={handleChangeMapSize}>{btOpenMapTxt}</button>
          <ReactMapGL
            {...viewport}
            width="100%"
            height="100%"
            onViewportChange={(viewport) => setViewport(viewport)}
            // TOKEN à sécurisé
            mapboxApiAccessToken={'pk.eyJ1IjoiYm9yaXNjb3VkZXJjIiwiYSI6ImNrbGszY2pjODF5YTAydnByaTZveGs5azIifQ.lyPoAYY3DSqpu8D8R1ULGw'}
          >
            {activities[0] &&
              activities.map((activity, index) => {
                return(
                  <CustomMarker
                    key={`marker-${index}`}
                    index={index}
                    user={false}
                    activity={activity}
                  />
                )
              })
            }
            <CustomMarker
              key={`marker-user`}
              index={0}
              user={true}
              activity={{
                activity_place: {
                  lat: parseFloat(lat),
                  lng: parseFloat(lng),
                }
              }}
            />
          </ReactMapGL>
        </div>
      )}
    </>
  );
};

MapList.propTypes = {
  activities: PropTypes.array.isRequired,
  lat: PropTypes.string.isRequired,
  lng: PropTypes.string.isRequired,
  userActivitiesIds: PropTypes.array.isRequired,
  userActivitiesCreatorIds: PropTypes.array.isRequired,
  scrollToFilter: PropTypes.func.isRequired,
};

export default MapList;
