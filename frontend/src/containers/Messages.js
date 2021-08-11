import { connect } from 'react-redux';
import Messages from 'src/components/Messages';

import { sendMessage } from 'src/actions/details';

const mapStateToProps = (state, ownProps) => ({
  messages: state.messages,
  //userId: state.login.user.id,
});

const mapDispatchToProps = (dispatch) => ({
  sendMessage: (message) => {
    dispatch(sendMessage(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Messages);
