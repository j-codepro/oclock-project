import { combineReducers } from 'redux';
import cards from './cards';
import userActivities from './userActivities';
import header from './header';
import login from './login';
import searchBar from './searchBar';
import loginModal from './loginModal';
import search from './search';
import details from './details';
import registration from './registration';
import creationPage from './creationPage';
import filter from './filter';
import messages from './messages';
import moreResults from './moreResults';

const globalReducer = combineReducers({
  cards,
  header,
  login,
  searchBar,
  loginModal,
  search,
  details,
  registration,
  creationPage,
  userActivities,
  filter,
  messages,
  moreResults,
});

export default globalReducer;
