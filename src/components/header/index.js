import React from 'react';
import logo from '../../logo.svg';
import './style.css';

const Header = () =>
  <header className="Header">
    <h1 className="Header-title">Applaudostudios Marvel APP</h1>
    <div className="MarvelBrand">
      <img
        src={logo}
        className="img-responsive center-block MarvelBrand-logo"
        alt="Marvel logo"
      />
    </div>
  </header>;

export default Header;
