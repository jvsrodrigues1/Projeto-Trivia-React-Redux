import React from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { storedRanking } from '../service/localStorageRanking';
import './styleSheet/Ranking.css';

class Ranking extends React.Component {
  state = {
    ranking: [],
  };

  componentDidMount() {
    const data = storedRanking();
    const sorted = data.sort((a, b) => (b.score - a.score));
    this.setState({ ranking: sorted });
  }

  render() {
    const { ranking } = this.state;
    return (
      <div className="ranking">
        <h1 data-testid="ranking-title">Ranking</h1>
        <div className="ranking-box">
          { ranking.map((score, index) => (
            <div
              className="ranked-user"
              key={ index }
            ></div>