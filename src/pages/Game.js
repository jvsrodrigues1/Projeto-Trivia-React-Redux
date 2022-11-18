import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import fetchTriviaQuestions from '../service/fetchTriviaQuestions';
import { getUpdatedScore } from '../redux/actions';
import { saveScorePlayer } from '../service/localStorageRanking';
import Header from '../Components/Header';
import Question from '../Components/Question';

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

  render() {
    const {
      state: {
        questions,
        renderIndex,
        isAnswered,
      },
      handleAnswer,
      nextQuestion,
    } = this;
    return (
      <main className="game-main-container">
        <Header />
        {
          questions.map((question, index) => (
            <section key={ question.question }>
              {
                renderIndex === index && (
                  <Question
                    handleClick={ handleAnswer }
                    question={ question }
                    isAnswered={ isAnswered }
                    nextQuestion={ nextQuestion }
                  />
                )
              }
            </section>
          ))
        }
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  ranking: {
    name: state.player.name,
    score: state.player.score,
    picture: state.player.gravatarEmail,
  },
  url: state.player.urlGame,
});

const mapDispatchToProps = (dispatch) => ({
  updateScore: (score, assertion) => dispatch(getUpdatedScore(score, assertion)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
