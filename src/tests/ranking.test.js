import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import Ranking from '../pages/Ranking';
import { saveScorePlayer } from '../service/localStorageRanking';

describe('Testa a página de ranking', () => {
  const ranking = [
    {
      name: 'jogador1',
      score: 100,
      picture:
        'https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e',
    },
    {
      name: 'jogador2',
      score: 120,
      picture:
        'https://www.gravatar.com/avatar/9e1f151bf326b5774f0b86cec01a9259',
    },
    {
      name: 'jogador3',
      score: 50,
      picture:
        'https://www.gravatar.com/avatar/86717b5175f8f51878eda44d435a756d',
    },
  ];

  beforeEach(() => {
    ranking.forEach((player) => {
      if (!JSON.parse(localStorage.getItem('ranking'))) {
        localStorage.setItem('ranking', JSON.stringify([player]));
      } else {
        saveScorePlayer(player);
      }
    });
  });

  test("Verifica se os componentes são renderizados na tela", async () => {
    renderWithRouterAndRedux(<Ranking />);    
    expect(screen.getByTestId("ranking-title")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /voltar/i })).toBeInTheDocument();

    ranking.forEach(({ name, score, picture }) => {
      expect(screen.getByAltText(`imagem ${name}`)).toHaveProperty('src', picture);
      expect(screen.getByRole("heading", { name: name, level: 3 })).toBeInTheDocument();
      expect(screen.getByRole("heading", { name: score, level: 3 })).toBeInTheDocument();
    });
  });
});
