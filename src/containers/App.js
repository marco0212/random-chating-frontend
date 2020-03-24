import App from '../components/App/App';
import { connect } from 'react-redux';
import { addChat, resetChat } from '../actions';

const mapStateToProps = state => ({
  chat: state.chat
});
const mapDispatchToProps = dispatch => ({
  addChat: (chat) => dispatch(addChat(chat)),
  resetChat: () => dispatch(resetChat())
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
