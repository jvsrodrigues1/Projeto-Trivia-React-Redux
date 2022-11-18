import React from 'react';
import { connect } from 'react-redux';
import logo from '../trivia.png';


class Header extends React.Component {
  render() {
    const { name, gravatarEmail, score } = this.props;
    return (
      <header>
        <img src={ logo } className="header-logo" alt="logo" />
        <div className="player-contaniner">
          <div className="player-info-container">
            {/* Funciona tchê */}
            <p data-testid="header-player-name">
              { name }
            </p>
            <span>Pontuação:</span>
            <span data-testid="header-score">
              { score }
            </span>
          </div>