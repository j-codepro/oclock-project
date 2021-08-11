import axios from 'axios';

import {
  SEND_MESSAGE,
  saveNewMessage,
} from 'src/actions/details';

const messages = (store) => (next) => (action) => {
  switch (action.type) {

    case SEND_MESSAGE:
      const userId = store.getState().login.user.id;
      if(userId) {
        axios
        .post(`${process.env.API_URL}/api/activity/${action.message.activityId}/messages`,
        {
          comment: action.message.comment,
          activityId: action.message.activityId,
          userId: userId,
        },
        { withCredentials: true }
        )
        .then((response) => {
          store.dispatch(saveNewMessage(response.data));
        })
        .catch((error) => {
          if(error.response.status === 401) {
            store.dispatch(disconnect());
          }
          console.log('error', error);
        });
      }
      break;

    default:
      next(action);
  }
};

export default messages;
