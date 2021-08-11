export const FETCH_PLACES_AUTOCOMPLETION = 'FETCH_PLACES_AUTOCOMPLETION';
export const FETCH_ONE_PLACES_AUTOCOMPLETION = 'FETCH_ONE_PLACES_AUTOCOMPLETION';
export const CHANGE_INPUT_VALUE_SEARCHBAR = 'CHANGE_INPUT_VALUE_SEARCHBAR';
export const SAVE_AUTOCOMPLETION_LIST ='SAVE_AUTOCOMPLETION_LIST';
export const CLEAR_LIST_AUTOCOMPLETE_DATA = 'CLEAR_LIST_AUTOCOMPLETE_DATA';
export const SAVE_VALID_LOCALISATION = 'SAVE_VALID_LOCALISATION';
export const CHANGE_VALID_LOCALISATION = 'CHANGE_VALID_LOCALISATION';
export const NO_RESULT_IN_VERIF_LOCALISATION = 'NO_RESULT_IN_VERIF_LOCALISATION';
export const CONFIRM_VALID_LOCALISATION = 'CONFIRM_VALID_LOCALISATION';
export const CHANGE_SEARCH_QUERY_IN_PROCESS_STATUT = 'CHANGE_SEARCH_QUERY_IN_PROCESS_STATUT';

export const changeInputValueSearchBar = (value) => ({
  type: CHANGE_INPUT_VALUE_SEARCHBAR,
  value,
});

export const saveValidLocalisation = (data) => ({
  type: SAVE_VALID_LOCALISATION,
  data
}); 

export const confirmValidLocalisation = () => ({
  type: CONFIRM_VALID_LOCALISATION,  
}); 

export const fetchPlacesAutoCompletion = () => ({
  type: FETCH_PLACES_AUTOCOMPLETION,
});

export const fetchOnePlacesAutoCompletion = () => ({
  type: FETCH_ONE_PLACES_AUTOCOMPLETION,
}); 

export const saveAutocompletionList = (data) => ({
  type: SAVE_AUTOCOMPLETION_LIST,
  data,
});

export const clearListAutocompleteData = () => ({
  type: CLEAR_LIST_AUTOCOMPLETE_DATA,
}); 

export const changeValidLocalisation = (index) => ({
  type: CHANGE_VALID_LOCALISATION,
  index,
}); 

export const noResultInVerifLocalisation = () => ({
  type: NO_RESULT_IN_VERIF_LOCALISATION,  
}); 

export const changeSearchQueryInProcessStatut = () => ({
  type: CHANGE_SEARCH_QUERY_IN_PROCESS_STATUT,  
}); 

