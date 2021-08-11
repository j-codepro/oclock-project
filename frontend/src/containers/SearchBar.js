import { connect } from 'react-redux';
import SearchBar from 'src/components/SearchBar';
import {showLoginModal} from 'src/actions/cards';
import {
  fetchPlacesAutoCompletion,
  fetchOnePlacesAutoCompletion,
  changeInputValueSearchBar,
  changeValidLocalisation,
  clearListAutocompleteData,
  changeSearchQueryInProcessStatut,
} from 'src/actions/searchBar';

const mapStateToProps = (state) => ({
  inputValue: state.searchBar.inputValue,
  listAutocompleteData: state.searchBar.autocomplete.list,
  errorLocalisation: state.searchBar.errorLocalisation,
  validLocalisation: state.searchBar.validLocalisation,
  searchQueryInProcess: state.searchBar.searchQueryInProcess,
  isLogged: state.header.isLogged,
});

const mapDispatchToProps = (dispatch) => ({
  changeValue: (value) => {
    dispatch(changeInputValueSearchBar(value));
  },
  fetchPlacesAutoCompletion: () => {
    dispatch(fetchPlacesAutoCompletion());
  },
  fetchOnePlacesAutoCompletion: () => {
    dispatch(fetchOnePlacesAutoCompletion());
  },
  changeValidLocalisation: (index) => {
    dispatch(changeValidLocalisation(index));
  },
  clearListAutocompleteData: () => {
    dispatch(clearListAutocompleteData());
  },
  changeSearchQueryInProcessStatut: () => {
    dispatch(changeSearchQueryInProcessStatut());
  },
  showLoginModal: () => {
    dispatch(showLoginModal());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
