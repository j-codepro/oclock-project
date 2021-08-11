export const FETCH_DATA_ACTTIVITY = 'FETCH_DATA_ACTTIVITY';
export const SAVE_ACTTIVITY = 'SAVE_ACTTIVITY';
export const JOIN_ACTIVITY = 'JOIN_ACTIVITY';
export const UPDATE_STATUS = 'UPDATE_STATUS';
export const ERROR_STATUS = 'ERROR_STATUS';
export const QUIT_ACTIVITY = 'QUIT_ACTIVITY';
export const SAVE_NEW_MESSAGE = 'SAVE_NEW_MESSAGE';
export const SEND_MESSAGE = 'SEND_MESSAGE';

export const fetchDataActivity = (id) => ({
  type: FETCH_DATA_ACTTIVITY,
  id,
});

export const saveActivity = (data) => ({
  type: SAVE_ACTTIVITY,
  data,
});

export const joinActivity = () => ({
  type: JOIN_ACTIVITY,
});

export const updateStatus = (operateur) => ({
  type: UPDATE_STATUS,
  operateur,
});

export const errorStatus = () => ({
  type: ERROR_STATUS,
});

export const quitActivity = () => ({
  type: QUIT_ACTIVITY,
});

export const saveNewMessage = (message) => ({
  type: SAVE_NEW_MESSAGE,
  message,
});

export const sendMessage = (message) => ({
  type: SEND_MESSAGE,
  message,
});

