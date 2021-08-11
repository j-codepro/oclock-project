import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

import { Link } from 'react-router-dom';
import { Marker } from 'react-map-gl';
import sports from '../../Card/sports';

const CustomMarker = ({ activity, user }) => {
  return (
    <Marker
      longitude={activity.activity_place.lng}
      latitude={activity.activity_place.lat}>
      <div className={user ? 'marker marker--user' : 'marker'}>
       {!user && (
        <Link to={`/activity/${activity.id}`} className="marker__link">
          <div className="marker__card">
              <img src={sports[activity.sport.icon]} alt="" className="marker__image" />
              <div className="marker__title">{activity.title}</div>
              <div className="marker__date">{activity.time} - {activity.date}</div>
          </div>
        </Link>
        )}
      </div>
    </Marker>
  );
};

CustomMarker.propTypes = {
  index: PropTypes.number.isRequired,
  activity: PropTypes.object.isRequired,
};

export default CustomMarker;
