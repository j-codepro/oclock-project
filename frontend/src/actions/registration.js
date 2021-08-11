export const SAVE_REGISTRATION_VALUE = 'SAVE_REGISTRATION_VALUE';
export const PASSWORD_ERROR = 'PASSWORD_ERROR';
export const PSEUDO_ERROR = 'PSEUDO_ERROR';
export const EMAIL_ERROR = 'EMAIL_ERROR';
export const FETCH_REGISTRATION_FORM = 'FETCH_REGISTRATION_FORM';
export const RESET_ERRORS = 'RESET_ERRORS';
export const CITY_ERROR = 'CITY_ERROR';

export const saveRegistrationValue = (value, input) => ({
  type: SAVE_REGISTRATION_VALUE,
  input,
  value,
});

export const passwordError = () => ({
  type: PASSWORD_ERROR,
});

export const pseudoError = () => ({
  type: PSEUDO_ERROR,
});

export const emailError = () => ({
  type: EMAIL_ERROR,
});

export const fetchRegistrationForm = () => ({
  type: FETCH_REGISTRATION_FORM,
});

export const resetErrors = () => ({
  type: RESET_ERRORS,
});

export const cityError = () => ({
  type: CITY_ERROR,
});
