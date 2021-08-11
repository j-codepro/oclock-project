export const CHANGE_INPUT_CREATE_FORM = 'CHANGE_INPUT_CREATE_FORM';
export const CHANGE_INPUT_CREATE_FORM_SELECT =
  'CHANGE_INPUT_CREATE_FORM_SELECT';
export const SEND_ACTIVITY_INFORMATION = 'SEND_ACTIVITY_INFORMATION';
export const FETCH_SPORTS = 'FETCH_SPORTS';
export const SAVE_SPORTS = 'SAVE_SPORTS';
export const ERROR_NOT_FOUND_PLACE = 'ERROR_NOT_FOUND_PLACE';
export const ACTIVITY_CREATED = 'ACTIVITY_CREATED';
export const CREATED_PASS_TO_FALSE = 'CREATED_PASS_TO_FALSE';

export const changeInputCreateForm = (value, name) => ({
  type: CHANGE_INPUT_CREATE_FORM,
  value,
  name,
});

export const changeInputCreateFormSelect = (value) => ({
  type: CHANGE_INPUT_CREATE_FORM_SELECT,
  value,
});

export const sendActivityInformation = () => ({
  type: SEND_ACTIVITY_INFORMATION,
});

export const fetchSports = () => ({
  type: FETCH_SPORTS,
});

export const saveSports = (sportsData) => ({
  type: SAVE_SPORTS,
  sportsData,
});
export const errorNotFoundPlace = (message) => ({
  type: ERROR_NOT_FOUND_PLACE,
  message,
});

export const activityCreated = () => ({
  type: ACTIVITY_CREATED,
});

export const createdPassToFalse =()=> ({
  type: CREATED_PASS_TO_FALSE,
});
