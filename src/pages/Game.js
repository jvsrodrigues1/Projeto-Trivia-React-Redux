import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchTriviaQuestions from '../service/fetchTriviaQuestions';
import { getUpdatedScore } from '../redux/actions';
import { saveScorePlayer } from '../service/localStorageRanking';

class Game extends Component {
  state = {
    questions: [],
    renderIndex: 0,
    isAnswered: false,
  };

  async componentDidMount() {
    const { history, url } = this.props;
    const { results } = await fetchTriviaQuestions(url);
    if (!results.length) {
      localStorage.removeItem('token');
      history.push('/');
    }

    this.setState({
      questions: [...results],
    });
  }
  savePlayerInStorage = () => {
    const { ranking } = this.props;
    const picture = `https://www.gravatar.com/avatar/${md5(ranking.picture).toString()}`;
    const storeRanking = { ...ranking, picture };
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([storeRanking]));
    } else {
      saveScorePlayer(storeRanking);
    }
  };

  handleAnswer = (questionScore) => {
    const { updateScore } = this.props;
    this.setState({ isAnswered: true });

    if (questionScore === 0) {
      updateScore(questionScore, 0);
    } else {
      updateScore(questionScore, 1);
    }
  };
  savePlayerInStorage = () => {
    const { ranking } = this.props;
    const picture = `https://www.gravatar.com/avatar/${md5(ranking.picture).toString()}`;
    const storeRanking = { ...ranking, picture };
    if (!JSON.parse(localStorage.getItem('ranking'))) {
      localStorage.setItem('ranking', JSON.stringify([storeRanking]));
    } else {
      saveScorePlayer(storeRanking);
    }
  };

  handleAnswer = (questionScore) => {
    const { updateScore } = this.props;
    this.setState({ isAnswered: true });

    if (questionScore === 0) {
      updateScore(questionScore, 0);
    } else {
      updateScore(questionScore, 1);
    }
  };
  