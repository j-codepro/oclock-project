import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import './style.scss';
// import Field from './Field';
import PropTypes from 'prop-types';

const CreationPage = ({
  title,
  date,
  time,
  min_participant,
  description,
  adress,
  zip_code,
  city,
  duration,
  onChangeForm,
  onChangeFormSelect,
  onSubmit,
  fetchSports,
  errorMessage,
  sports,
  isCreated,
  createdPassToFalse,
}) => {
  const history = useHistory();

  useEffect(() => {
    //console.log('useEffect 1');
    if (isCreated) {
      history.push('/');
      createdPassToFalse();
      //return <Redirect to="/" />;
    } else {
      fetchSports();
    }
  }, []);
  
  useEffect(() => {
    //console.log('useEffect 2');
    if (isCreated) {
      createdPassToFalse();
      history.push('/');
      //return <Redirect to="/" />;
    }
  }, [isCreated]);

  const today = new Date();
  const year = today.getFullYear();
  const month = ('0' + (today.getMonth() + 1)).slice(-2);
  const day = ('0' + today.getDate()).slice(-2);
  const todayFormat = `${year}-${month}-${day}`;
  // console.log(todayFormat);

  const handleSelectInput = (e) => {
    // console.log('handleselect', e.target.value);
    onChangeFormSelect(e.target.value);
  };
  
  const handleChange = (evt) => {
    onChangeForm(evt.target.value, evt.target.name);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log('handleOnSubmit');
    onSubmit();
  };

  return (
    <section className="create-form">
      <form className="create-form__container" onSubmit={handleOnSubmit}>
        <h1 className="create-form__title">Crée ton activité :</h1>

        <label htmlFor="title" className="create-form__label">
          Nom de l'activité<span className="create-form__required">*</span>
        </label>
        <input
          className="create-form__input create-form__input--large"
          type="text"
          placeholder="Nom de l'activité"
          name="title"
          value={title}
          onChange={handleChange}
        />

        <div className="create-form__container-inner-3col">
          <div>
            <label htmlFor="date" className="create-form__label">
              Date<span className="create-form__required">*</span>
            </label>
            <input
              required
              className="create-form__input create-form__input--select"
              type="date"
              // id="date"
              value={date}
              min={todayFormat}
              max="2025-12-31"
              name="date"
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="time" className="create-form__label">
              Horaire<span className="create-form__required">*</span>
            </label>
            <input
              required
              className="create-form__input"
              type="time"
              // id="time"
              min="06:00"
              max="24:00"
              // required
              name="time"
              value={time}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="duration" className="create-form__label">
              Durée<span className="create-form__required">*</span>
            </label>
            <input
              required
              className="create-form__input"
              type="time"
              // id="time"
              min="00:00"
              // required
              name="duration"
              value={duration}
              onChange={handleChange}
            />
          </div>
        </div>
        {/* <h2 className="create-form__subtitle">Information</h2> */}
        <div className="create-form__container-inner">
          <div>
            <label className="create-form__label">
              Sport<span className="create-form__required">*</span>
            </label>
            <select
              required
              className="create-form__input create-form__input--large create-form__input--select "
              name="sport"
              id="sport-select"
              onChange={handleSelectInput}
            >
              <option value="">Choisis un sport</option>
              {sports.map((sport) => {
                return (
                  <option
                    className="create-form__input create-form__input--black"
                    key={sport.id}
                    value={sport.id}
                  >
                    {sport.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label htmlFor="minimum participant" className="create-form__label">
              Participants minimum
            </label>
            <input
              className="create-form__input create-form__input--select"
              type="number"
              name="min_participant"
              min="1"
              max="40"
              value={min_participant}
              onChange={handleChange}
            />
          </div>
        </div>

        <label htmlFor="description" className="create-form__label">
          Description
        </label>
        <textarea
          className="create-form__input create-form__input--hight"
          type="textarea"
          placeholder="Description de l'activité proposée"
          name="description"
          rows="5"
          value={description}
          onChange={handleChange}
        />
        {/* <h2 className="create-form__subtitle">Point de départ</h2> */}
        <label htmlFor="adress" className="create-form__label">
          Adresse
        </label>
        {errorMessage && (
          <div className="create-form__error">{errorMessage}</div>
        )}

        <input
          className="create-form__input create-form__input--large"
          type="text"
          placeholder="Entre une adresse"
          name="adress"
          value={adress}
          onChange={handleChange}
        />
        <div className="create-form__container-inner">
          <div className="col">
            <label htmlFor="code postal" className="create-form__label">
              Code postal
            </label>
            <input
              className="create-form__input"
              type="text"
              placeholder="Code postal"
              name="zip_code"
              value={zip_code}
              onChange={handleChange}
            />
          </div>

          <div className="col">
            <label htmlFor="date" className="create-form__label">
              Ville<span className="create-form__required">*</span>
            </label>
            <input
              required
              className="create-form__input"
              type="text"
              placeholder="Ville"
              name="city"
              value={city}
              onChange={handleChange}
            />
          </div>
        </div>
        <button
          type="submit"
          className="create-form__input create-form__input--submit"
        >
          Proposer
        </button>
      </form>
    </section>
  );
};

CreationPage.propTypes = {
  title: PropTypes.string,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  min_participant: PropTypes.node.isRequired,
  description: PropTypes.string.isRequired,
  adress: PropTypes.string.isRequired,
  zip_code: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
  onChangeForm: PropTypes.func.isRequired,
  fetchSports: PropTypes.func.isRequired,
  createdPassToFalse: PropTypes.func.isRequired,
};

export default CreationPage;
