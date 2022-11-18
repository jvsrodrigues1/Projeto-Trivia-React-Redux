import React from 'react';

class Timer extends React.Component {
  componentDidMount() {
    const { updateTimer } = this.props;
    updateTimer();
  }

  componentDidUpdate(prevProps) {
    const { isAnswered, time, intervalId } = prevProps;
    if (isAnswered || time === 1) {
      clearInterval(intervalId);
    }
  }

  render() {
    const { time } = this.props;
    return (
      <div>
        <p className="timer" data-testid="timer-question">{ time }</p>
      </div>
    );
  }
}

export default Timer;
