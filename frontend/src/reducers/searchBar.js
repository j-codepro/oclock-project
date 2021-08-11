import {
  CHANGE_INPUT_VALUE_SEARCHBAR,
  SAVE_VALID_LOCALISATION,
  CHANGE_VALID_LOCALISATION,
  SAVE_AUTOCOMPLETION_LIST,
  CLEAR_LIST_AUTOCOMPLETE_DATA,
  NO_RESULT_IN_VERIF_LOCALISATION,
  CONFIRM_VALID_LOCALISATION,
  CHANGE_SEARCH_QUERY_IN_PROCESS_STATUT,
} from 'src/actions/searchBar';

const initialState = {
  inputValue: '',
  //currentSearch: '',
  validLocalisation: {
    query: '',
  },
  autocomplete: {
    query: '',
    list: [],
  },
  errorLocalisation: false,
  searchQueryInProcess: false,
};

const searchBar = (state = initialState, action = {}) => {
  switch (action.type) {

    case CHANGE_INPUT_VALUE_SEARCHBAR: {
      return {
        ...state,
        errorLocalisation: false,
        inputValue: action.value,
      }
    }

    case SAVE_AUTOCOMPLETION_LIST: {
      return {
        ...state,
        autocomplete: {
          query: state.inputValue,
          list: [...action.data],
        }
      }
    }

    case SAVE_VALID_LOCALISATION: {
      return {
        ...state,
        errorLocalisation: false,
        searchQueryInProcess: true,
        validLocalisation: {
          ...action.data,
        },
      }
    }

    case CONFIRM_VALID_LOCALISATION: {
      return {
        ...state,
        searchQueryInProcess: true,
      }
    }

    case CHANGE_SEARCH_QUERY_IN_PROCESS_STATUT: {
      return {
        ...state,
        inputValue: '',
        searchQueryInProcess: false,
      }
    }

    case CHANGE_VALID_LOCALISATION: {
      return {
        ...state,
        errorLocalisation: false,
        inputValue: state.autocomplete.list[action.index].name,
        validLocalisation: {
          ...state.autocomplete.list[action.index]
        },
      }
    }

    case CLEAR_LIST_AUTOCOMPLETE_DATA: {
      return {
        ...state,
        autocomplete: {
          query: '',
          list: [],
        }
      }
    }

    case NO_RESULT_IN_VERIF_LOCALISATION: {
      return {
        ...state,
        errorLocalisation: true,
      }
    }
    default: 
      return state; 
  }
};

export default searchBar;
