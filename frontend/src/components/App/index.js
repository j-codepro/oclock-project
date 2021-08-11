// == Import npm
import React, { useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// == Import
import Accueil from 'src/containers/Accueil';
import Search from 'src/containers/Search';
import Header from 'src/containers/Header';
import Footer from 'src/components/Footer';
import Login from 'src/containers/Login';
import LoginModal from 'src/containers/LoginModal';
import Error404 from 'src/components/Error404';
import Team from 'src/components/Team';
import Details from 'src/containers/Details';
import CreationPage from 'src/containers/CreationPage';
import Registration from 'src/containers/Registration';

import './styles.css';

// == Composant
const App = ({ getUser, isLogged }) => {
  useEffect(() => {
    getUser();
  }, []); 
  // console.log(isLogged);

  return (
    <>
      <Header />
      <Switch>
        <Route path="/" exact>
          <Accueil />
        </Route>

        <Route path="/connexion" exact>
          <Login />
        </Route>
    
        <Route path="/inscription" exact>
            <Registration />
        </Route>

        <Route path="/search">
          <Search />
        </Route>
    
        <Route path="/activity/:id">
          {isLogged && <Details />}
          {!isLogged && <Redirect to="/connexion" />}
        </Route>

        <Route path="/creation">
          <CreationPage />
        </Route>
    
        <Route path="/equipe">
          <Team />
        </Route>

        <Route>
          <Error404 />
        </Route>

      </Switch>
      <Footer />

      <LoginModal />
    </>
  );
};

App.propTypes = {
  isLogged: PropTypes.bool.isRequired,
};

// == Export
export default App;
