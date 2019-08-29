import React, { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';

import './Timer.css';

const START = 'timer.start';
const RESET = 'timer.reset';
const PAUSE = 'timer.pause';
const COUNT = 'timer.count';

const timerReducer = (state, action) => {
  switch (action.type) {
    case RESET:
      return action.payload;

    case PAUSE:
      return {
        ...state,
        intervalId: null,
        isRunning: false,
      };

    case START:
      return {
        ...state,
        intervalId: action.payload,
        isRunning: true,
        time: state.time - 1,
      };

    case COUNT:
      return {
        ...state,
        time: state.time - 1,
      };

    default:
      return state;
  }
};

function Timer(props) {
  const [rootState, rootDispatch] = useStateValue();
  const taskId = props.match.params.id;
  const taskTitle = rootState.tasks[taskId];
  const sessionTime = rootState.sessionTime * 60;
  const initialState = { intervalId: null, isRunning: false, time: sessionTime };
  const [state, dispatch] = useReducer(timerReducer, initialState);

  // https://dev.to/trentyang/replace-lifecycle-with-hooks-in-react-3d4n

  // componentDidUpdate
  useEffect(() => {
    if (state.time <= 0) {
      state.intervalId && clearInterval(state.intervalId);
      dispatch({ type: RESET, payload: initialState });
    };
  });

  // componentWillUnmount
  useEffect(() => {
    return () => {
      state.intervalId && clearInterval(state.intervalId);
    };
  }, []);

  if (rootState.currentTaskId !== taskId) {
    rootDispatch({ type: 'setCurrentTaskId', payload: taskId });
  }

  const onAction = (action) => {
    let payload;

    switch (action) {
      case RESET:
        state.intervalId && clearInterval(state.intervalId);
        payload = initialState;
        break;

      case START:
        payload = setInterval(() => { dispatch({ type: COUNT }) }, 1000);
        break;

      case PAUSE:
        state.intervalId && clearInterval(state.intervalId);
        break;
    }

    dispatch({ type: action, payload });
  };

  return (
    <div className="timer-component">
      <TimerTitle task={taskTitle} />
      <TimerTime time={state.time} sessionTime={sessionTime} />
      <TimerActions time={state.time} sessionTime={sessionTime} isRunning={state.isRunning} onAction={onAction} />
    </div>
  );
}

function TimerTitle({ task }) {
  return (
    <ul className="breadcrumb">
      <li className="breadcrumb-item">
        <Link to="/">Tasks</Link>
      </li>
      <li className="breadcrumb-item">
        <b>{task}</b>
      </li>
    </ul>
  );
}

// ref: https://codepen.io/JMChristensen/pen/Ablch
function TimerTime({ time, sessionTime }) {
  const minutes = Math.floor(time / 60);
  const seconds = (time % 60);
  const percent = Math.max(0, Math.min(time / sessionTime * 100, 100));
  const style = { strokeDashoffset: (565.48 / 100 * percent).toFixed(2) };
  const value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

  return (
    <div className="timer-value" data-value={value}>
      <svg className="timer-circle" width="200" height="200" version="1.1" xmlns="http://www.w3.org/2000/svg">
        <circle r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset="0"></circle>
        <circle className="indicator" r="90" cx="100" cy="100" fill="transparent" strokeDasharray="565.48" strokeDashoffset="0" style={style}></circle>
      </svg>
    </div>
  );
}

function TimerActions({ time, sessionTime, isRunning, onAction }) {
  return (
    <div className="timer-actions">
      <button className="btn btn-primary" onClick={() => onAction(isRunning ? PAUSE : START)}>
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button className="btn" onClick={() => onAction(RESET)} disabled={time === sessionTime}>
        Reset
      </button>
      <br /><br />
      <Link className="btn" to={{ pathname: '/timer/settings' }}>
        Configure
      </Link>
    </div>
  );
}

export default Timer;
