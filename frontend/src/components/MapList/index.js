import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import ReactMapGL, { NavigationControl } from 'react-map-gl';
import CustomMarker from './CustomMarker'; 

const navControlStyle= {
  right: 10,
  bottom: 10
};

const MapList = ({ activities, lat, lng, userActivitiesIds, userActivitiesCreatorIds, scrollToFilter }) => {

  // Clusterise les activités si plusieurs activité avec la même adresse
  const formatedActivity = (activity, userRole) => {
    return {
      id: activity.id, 
      title: activity.title,
      date: activity.date,
      time: activity.time,
      sport: activity.sport.name,
      icon: activity.sport.icon,
      userRole: userRole,
    }
  }
  const markerPoints = [];
  activities.forEach((activity, index) => {
    //const activityLat = activity.activity_place.lat.toFixed(2);
    //const activityLng = activity.activity_place.lng.toFixed(2);
    const activityLat = Math.round( activity.activity_place.lat * 1000) / 1000;
    const activityLng = Math.round( activity.activity_place.lng * 1000) / 1000;

    // controle si le user logged est creator ou participant
    let userRole = '';
    if(userActivitiesCreatorIds.includes(activity.id)) {
      //cardsCreated.push(<Card key={`card-${card.id}`} card={card} userCard={2} />)
      userRole = 'creator';
    } else if(userActivitiesIds.includes(activity.id)) {
      //cardsCreated.push(<Card key={`card-${card.id}`} card={card} userCard={1} />)
      userRole = 'registered';
    }

    let markerFind = markerPoints.find(marker => marker.lat === activityLat && marker.lng === activityLng);
    if(markerFind) {
      markerFind.activities.push(formatedActivity(activity, userRole))
    } else {
      markerPoints.push({
        name: `marker${index}`,
        lat: activityLat,
        lng: activityLng,
        activities: [formatedActivity(activity, userRole)],
      });
    }
  });

  /*
  useEffect(() => {
    console.log(activities);
  }, [activities])
  */

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

  const [settings, setsettings] = useState({
    //dragPan: false,
    //dragRotate: false,
    scrollZoom: false,
    //touchZoom: false,
    //touchRotate: false,
    //keyboard: false,
    //doubleClickZoom: false
    mapStyle: "mapbox://styles/mapbox/streets-v11",
  });

  useEffect(() => {
    return () => {
      // au unmount du composent (changement de page ... ) o  veux être dur de remettre le body overflow à visible
      document.body.style.overflow = "visible";
    }
  }, [])

  const map = useRef(null);
  const [btOpenMapTxt, setbtOpenMapTxt] = useState('Voir sur la carte');
  const [classNameMap, setClassNameMap] = useState('map-list');
  const handleChangeMapSize = () => {
    if(classNameMap === 'map-list') {
      map.current.scrollIntoView({behavior: "smooth"})  
      setClassNameMap('map-list map-list--open');
      setbtOpenMapTxt('Fermer la carte');
      document.body.style.overflow = "hidden";
    } else {
      scrollToFilter();
      setClassNameMap('map-list');
      setbtOpenMapTxt('Voir sur la carte');
      document.body.style.overflow = "visible";
    }
  }
  
  return (
    <>
      {activities && (
        <div className={classNameMap} ref={map} >
          <button className="map-list__button-open" onClick={handleChangeMapSize}>{btOpenMapTxt}</button>
          <ReactMapGL
            {...viewport}
            {...settings}
            width="100%"
            height="100%"
            onViewportChange={(viewport) => setViewport(viewport)}
            // TOKEN à sécurisé
            mapboxApiAccessToken={'pk.eyJ1IjoiYm9yaXNjb3VkZXJjIiwiYSI6ImNrbGszY2pjODF5YTAydnByaTZveGs5azIifQ.lyPoAYY3DSqpu8D8R1ULGw'}
          >
            <NavigationControl style={navControlStyle} />
            <CustomMarker
              key={`marker-user`}
              index={0}
              user={true}
              marker={{
                lat: parseFloat(lat),
                lng: parseFloat(lng),
              }}
            />
            {markerPoints[0] &&
              markerPoints.map((marker, index) => {
                return(
                  <CustomMarker
                    key={`marker-${index}`}
                    index={index}
                    user={false}
                    marker={marker}
                  />
                )
              })
            }
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
