import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import inicialGame from '../service/localStoragePlayer';

class Login extends Component {
  state = {
    nome: '',
    email: '',
    isButtonDisabled: true,
  };

  handleClick = async () => {
    const { history, getPlayer } = this.props;
    const { nome, email } = this.state;
    const token = await this.fetchToken();
    inicialGame(token);
    getPlayer(nome, email);
    history.push('/game');
  };

  checkInputs = () => {
    const { nome, email } = this.state;
    if (nome.length < 1 || email.length < 1) {
      this.setState({ isButtonDisabled: true });
    } else {
      this.setState({ isButtonDisabled: false });
    }
  };

  handleChange = (event) => {
    const { target: { value, name } } = event;
    this.setState({ [name]: value }, this.checkInputs);
  };

  render() {
    const {
      handleChange,
      handleClick,
      state: {
        nome,
        email,
        isButtonDisabled,
      },
    } = this;
    return (
      <form className="form-login">
        <header className="login-header">
          <img src={ logo } className="login-logo" alt="logo" />
        </header>
        <label htmlFor="nome-input">
          <input
            type="text"
            id="nome-input"
            name="nome"
            value={ nome }
            onChange={ handleChange }
            placeholder="Name"
            data-testid="input-player-name"
          />
        </label>
        <label htmlFor="email-input">
          <input
            type="text"
            id="email-input"
            data-testid="input-gravatar-email"
            name="email"
            value={ email }
            onChange={ handleChange }
            placeholder="Email"
          />
        </label>
        <button
          type="button"
          data-testid="btn-play"
          onClick={ handleClick }
          disabled={ isButtonDisabled }
          className="button-play"
        >
          Play
        </button>
        <Link to="/settings">
          <button type="button" data-testid="btn-settings" className="button-settings">
            Configurações
          </button>
        </Link>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getPlayer: (nome, email) => dispatch(getPlayerAction(nome, email)),
});

export default connect(null, mapDispatchToProps)(Login);
