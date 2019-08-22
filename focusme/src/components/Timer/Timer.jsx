import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Timer.css';

class Timer extends Component {
  get isRunning() {
    return Boolean(this.state.timeInterval);
  }

  constructor(props) {
    super(props);
    this.defaultTime = 1 * 60; // in seconds
    this.state = {
      taskId: props.match.params.id,
      task: props.location.state.task,
      time: props.location.state.sessionTime * 60,
      timeInterval: null,
    };
  }

  render() {
    return (
      <div>
        {this.renderTitle()}
        {this.renderTime()}
        {this.renderActions()}
      </div>
    );
  }

  renderTitle() {
    return (
      <ul className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Tasks</Link>
        </li>
        <li className="breadcrumb-item">
          <b>{this.state.task}</b>
        </li>
      </ul>
    );
  }

  // ref: https://codepen.io/JMChristensen/pen/Ablch
  renderTime() {
    const minutes = Math.floor(this.state.time / 60);
    const seconds = (this.state.time % 60);
    const percent = Math.max(0, Math.min(this.state.time / this.defaultTime * 100, 100));
    const style = { strokeDashoffset: (565.48 / 100 * percent).toFixed(2) };
    const value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    return (
      <div className="timer-value" data-value={value}>
        <svg className="timer-circle" width="200" height="200" viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <circle r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset="0"></circle>
          <circle className="indicator" r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset="0" style={style}></circle>
        </svg>
      </div>
    );
  }

  renderActions() {
    return (
      <div className="timer-actions">
        <button className="btn btn-primary" onClick={this.onToggleRunning.bind(this)}>
          {this.isRunning ? 'Pause' : 'Start'}
        </button>
        <button className="btn" onClick={this.onReset.bind(this)} disabled={this.state.time === this.defaultTime}>
          Reset
        </button>
        <br />
        <Link className="btn" to={{ pathname: '/timer/settings', state: { taskId: this.state.taskId } }}>
          Configure
        </Link>
      </div>
    );
  }

  onToggleRunning() {
    if (!this.isRunning) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  }

  onReset() {
    this.pauseTimer(true);
  }

  startTimer() {
    this.setState({
      ...this.state,
      timeInterval: setInterval(() => {
        if (this.state.time > 0) {
          this.setState({ ...this.state, time: this.state.time - 1 });
        } else {
          this.pauseTimer(true);
        }
      }, 1000)
    });
  }

  pauseTimer(reset) {
    clearInterval(this.state.timeInterval);
    this.setState({
      ...this.state,
      timeInterval: null,
      time: reset ? this.defaultTime : this.state.time
    });
  }
}

export default Timer;
