export const SAVE_LOGIN = 'SAVE_LOGIN';
export const FETCH_LOGIN = 'FETCH_LOGIN';
export const SAVE_CONNEXION_STATUT = 'SAVE_CONNEXION_STATUT';
export const DISCONNECT = 'DISCONNECT';
export const LOG_OUT = 'LOG_OUT';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const CLOSE_MODAL = 'CLOSE_MODAL';
export const GET_USER = 'GET_USER';
export const SAVE_USER_POINTS = 'SAVE_USER_POINTS';

export const saveLogin = (value, input) => ({
  type: SAVE_LOGIN,
  value,
  input,
});

export const fetchLogin = () => ({
  type: FETCH_LOGIN,
});

export const saveConnexionStatut = (data) => ({
  type: SAVE_CONNEXION_STATUT,
  data,
});

export const disconnect = () => ({
  type: DISCONNECT,
});

export const logOut = () => ({
  type: LOG_OUT,
});

export const loginError = () => ({
  type: LOGIN_ERROR,
});

export const closeModal = () => ({
  type: CLOSE_MODAL,
});

export const getUser = () => ({
  type: GET_USER,
});

export const saveUserPoints = (data) => ({
  type: SAVE_USER_POINTS,
  data,
});
