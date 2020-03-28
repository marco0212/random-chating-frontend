import { connect } from 'react-redux';
import App from '../../components/App/App';
import {
  addChat,
  resetChat,
  updateIsLogin,
  updateIsPending,
  updateIsTyping
} from '../../actions';

const mapStateToProps = (state) => ({
  chats: state.chats,
  isLogin: state.status.isLogin,
  isPending: state.status.isPending,
  isTyping: state.status.isTyping
});
const mapDispatchToProps = (dispatch) => ({
  addChat: (chat) => dispatch(addChat(chat)),
  resetChat: () => dispatch(resetChat()),
  updateIsLogin: (bool) => dispatch(updateIsLogin(bool)),
  updateIsPending: (bool) => dispatch(updateIsPending(bool)),
  updateIsTyping: (bool) => dispatch(updateIsTyping(bool))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
