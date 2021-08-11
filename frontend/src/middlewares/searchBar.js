import axios from "axios";
import {
  FETCH_PLACES_AUTOCOMPLETION,
  FETCH_ONE_PLACES_AUTOCOMPLETION,
  saveAutocompletionList,
  saveValidLocalisation,
  clearListAutocompleteData,
  noResultInVerifLocalisation,
  confirmValidLocalisation,
} from 'src/actions/searchBar';

// verif à stocker ailleur :
const apiKey = `82a0b22e81932aad65c97e8bcc2f192a`;

const searchBar = (store) => (next) => (action) => {
  let inputValue = store.getState().searchBar.inputValue;
  
  switch (action.type) {
      case FETCH_PLACES_AUTOCOMPLETION:
        // ne pas relancer la recherche avec l'API si la liste autocompletion est déjà enregistré sur la même inputValue
        let lastAutocompleteQuery = store.getState().searchBar.autocomplete.query;
        if(inputValue.toLowerCase().trim() !== lastAutocompleteQuery.toLowerCase().trim()) {
          axios
          .get(
            `http://api.positionstack.com/v1/forward?access_key=${apiKey}&country=FR&query=${inputValue}`,
          )
          .then((response) => {
            const localisations = response.data.data;
            //console.log('FETCH_PLACES_AUTOCOMPLETION response.data.data', response.data.data);
            if(localisations.length > 0) {
              const formatedData = [];
              localisations.forEach((element) => {
                // garde que les résultats avec un name et non de type "venue" (nom approximatif de lieu)
                //if (element.type !== 'venue' && element.name) {
                if (element.type !== 'neighbourhood' && element.name) {
                //if (element.name) {
                  formatedData.push({
                    query: inputValue,
                    name: element.name,
                    city: element.locality,
                    reg: element.region,
                    lat: element.latitude,
                    lng: element.longitude,
                  });
                }
              });

              store.dispatch(saveAutocompletionList(formatedData));
            } else {
              store.dispatch(clearListAutocompleteData());
            }
          })
          .catch((error) => {
            console.log('error', error);
          });
        }
      break;

      
      case FETCH_ONE_PLACES_AUTOCOMPLETION:
        // ne pas relancer la verif avec l'API si l'adresse à déjà été enregistré sur la même inputValue
        let lastValidLocalisationQuery = store.getState().searchBar.validLocalisation.query;
        if(inputValue.toLowerCase().trim() !== lastValidLocalisationQuery.toLowerCase().trim()) {
          //console.log('FETCH_ONE_PLACES_AUTOCOMPLETION ', inputValue );
          axios
          .get(
            `http://api.positionstack.com/v1/forward?access_key=${apiKey}&country=FR&limit=1&query=${inputValue}`,
          )
          .then((response) => {

            console.log(response.data.data);
            // pas de résultat : {data: Array(0)}


            const localisation = response.data.data[0];
            if(localisation && localisation.name) {
              //console.log('RESULTAT POUR RECHERCHE ----->>>', inputValue, localisation)
              const validLocalisation = {
                query: inputValue,
                name: localisation.name,
                city: localisation.locality,
                reg: localisation.region,
                lat: localisation.latitude,
                lng: localisation.longitude,
              };
              store.dispatch(saveValidLocalisation(validLocalisation));
            } else {
              //console.log('PAS DE RESULTAT ----->>>')
              store.dispatch(noResultInVerifLocalisation());
            }


          })
          .catch((error) => {
            console.log('error', error);
          });
        } else {
          // console.log('RESULTAT POUR RECHERCHE  2 ----->>>', inputValue)
          store.dispatch(confirmValidLocalisation());
        }
      break;

  default:
      next(action);
  } 
};

export default searchBar;
