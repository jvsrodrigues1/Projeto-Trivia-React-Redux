import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Feedback from '../pages/Feedback';
import App from '../App';

describe('Teste a página de Feedback', () => {
  test('Verifica a página de Feedback', () => {
    renderWithRouterAndRedux(<Feedback />);
    const feedbackPage = screen.getByText(/feedback/i);
    expect(feedbackPage).toHaveTextContent('Feedback');
  });

  test('Verifica na tela nome, gravatar e score do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("header-profile-picture")).toBeInTheDocument();
    expect(screen.getByTestId("header-player-name")).toBeInTheDocument();
    expect(screen.getByTestId("header-score")).toBeInTheDocument();
  });

  test('Verifica na tela mensagem de feedback para jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("feedback-text")).toBeInTheDocument();
  });

  test('Verifica na tela o número de acertos e pontuação do jogador', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("feedback-total-score")).toBeInTheDocument();
    expect(screen.getByTestId("feedback-total-question")).toBeInTheDocument();
  });

  test('Verifica na tela os botões de \'Ranking\' e \'Jogar Novamente\'', () => {
    renderWithRouterAndRedux(<Feedback />);
    expect(screen.getByTestId("btn-ranking")).toBeInTheDocument();
    expect(screen.getByTestId("btn-play-again")).toBeInTheDocument();
  });

  test('Verifica se ao clicar no botão \'Jogar Novamente\' a navegação acontece normalmente', async () => {
    act(() => {
    const { history } = renderWithRouterAndRedux(<App />);
    history.push('/feedback');
  });
    const goBack = screen.getByTestId(/btn-play-again/i);
    userEvent.click(goBack);
    const inputs = screen.getByRole('button', {name: /play/i});
    expect(inputs).toBeInTheDocument();
  });

  test('Verifica se a mensagem de feedback é renderizada corretamente', () => {
    const initialReduxState = {
      player: {
        name: '',
        assertions: 3,
        score: 100,
        gravatarEmail: '',
        urlGame: '',
      }
    }
    act(() => {
    const { history } = renderWithRouterAndRedux(<App />, initialReduxState);
    history.push('/feedback');
  });
    
    expect(screen.getByRole('heading', { name: /well done!/i })).toBeInTheDocument();
  })
});