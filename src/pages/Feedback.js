import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaRegGrinBeamSweat } from 'react-icons/fa';
import { RiEmotionSadLine } from 'react-icons/ri';
import Header from '../Components/Header';

class Feedback extends React.Component {
  render() {
    const { assertions, score } = this.props;
    const MIN_ASSERTIONS = 3;
    return (
      <main className="feedback">
        <Header />
        <h1>Feedback</h1>
        {
          (assertions < MIN_ASSERTIONS)
            ? (
              <div className="better">
                <h2 data-testid="feedback-text">Could be better...</h2>
                <RiEmotionSadLine className="sad-icon" />
              </div>
            )
            : (
              <div className="well-done">
                <h2 data-testid="feedback-text">Well Done!</h2>
                <FaRegGrinBeamSweat className="happy-icon" />
              </div>
            )
        }
        <section className="points">
          <span>Pontuação:</span>
          <span data-testid="feedback-total-score">{ score }</span>
          <span>Acertos:</span>
          <span data-testid="feedback-total-question">{ assertions }</span>
        </section>
        <div className="buttons">
          <Link to="/ranking">
            <button
              type="button"
              data-testid="btn-ranking"
              className="button-ranking"
            >
              VER RANKING
            </button>
          </Link>
          <Link to="/">
            <button
              type="button"
              data-testid="btn-play-again"
              className="button-play-again"
            >
              JOGAR NOVAMENTE
            </button>
          </Link>
        </div>
      </main>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

export default connect(mapStateToProps)(Feedback);
