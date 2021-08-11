import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { Link } from 'react-router-dom';
import { Marker } from 'react-map-gl';
import sports from '../../Card/sports';

const CustomMarker = ({ marker, user }) => {
  //console.log(marker.activities[0].userRole)
  return (
    <Marker
      longitude={parseFloat(marker.lng)}
      latitude={parseFloat(marker.lat)}>
      <div className={user ? 'marker marker--user' : 'marker'}>
       {!user && (
          <div className="marker__card">
            {marker.activities.length > 0 && (
              marker.activities.map((activity, index) => {
                return (
                  <Link to={`/activity/${activity.id}`} key={`activity-${index}`} className={`marker__link marker__link--${activity.userRole}`}>
                    <img src={sports[activity.icon]} alt="" className="marker__image" />
                    <div className="marker__content">
                      <div className="marker__sport">{activity.sport}</div>
                      <div className="marker__title">{activity.title}</div>
                      <div className="marker__date">{activity.date} - {activity.time}</div>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        )}
      </div>
    </Marker>
  );
};

CustomMarker.propTypes = {
  index: PropTypes.number.isRequired,
  marker: PropTypes.object.isRequired,
  role: PropTypes.string,
};

export default CustomMarker;
