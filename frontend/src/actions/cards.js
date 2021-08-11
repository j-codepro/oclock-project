export const FETCH_LAST_ACTIVITIES = 'FETCH_LAST_ACTIVITIES';
export const FETCH_USER_ACTIVITIES = 'FETCH_USER_ACTIVITIES';
export const SAVE_ACTIVITIES = 'SAVE_ACTIVITIES';
export const SAVE_USER_ACTIVITIES = 'SAVE_USER_ACTIVITIES';
export const SHOW_LOGIN_MODAL = 'SHOW_LOGIN_MODAL';
export const SAVE_ALL_ACTIVITIES = 'SAVE_ALL_ACTIVITIES';
export const CLEAR_USER_ACTIVITIES = 'CLEAR_USER_ACTIVITIES';

export const fetchLastActivities = () => ({
  type: FETCH_LAST_ACTIVITIES,
});

export const fetchUserActivities = () => ({
  type: FETCH_USER_ACTIVITIES,
});

export const saveActivities = (data) => ({
  type: SAVE_ACTIVITIES,
  data,
});

export const saveUserActivities = (data) => ({
  type: SAVE_USER_ACTIVITIES,
  data,
});

export const showLoginModal = () => ({
  type: SHOW_LOGIN_MODAL,
});

export const saveAllActivities = (data) => ({
  type: SAVE_ALL_ACTIVITIES,
  data,
});

export const clearUserActivities = () => ({
  type: CLEAR_USER_ACTIVITIES,
});
