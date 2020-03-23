import App from '../components/App/App';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(App);
