import React from 'react';
import { Link } from 'react-router-dom';

import './index.scss';

const Footer = () => (
  <footer className="footer">
    <p className="footer__copyright">FairPlay © 2020 - Tous droits réservés</p>
    <ul className="footer__links">
    <Link to="/equipe"><li>Equipe</li></Link>
    <Link to="#"><li>Contact</li></Link>
    <Link to="#"><li>CGU</li></Link>
    </ul>
  </footer>
);

export default Footer;
