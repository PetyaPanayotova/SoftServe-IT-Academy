import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';
import TaskList from '../TaskList/TaskList';

import './TimerSettings.css';

function TimerSettings(props) {
  const [state, dispatch] = useStateValue();

  return (
    <div className="timer-settings">
      <IntervalConfig
        id="sessionLength"
        label="Session length"
        value={state.sessionTime}
        onChange={(x) => dispatch({ type: 'setSessionTime', payload: x })} />
      <IntervalConfig
        id="breakLength"
        label="Break length"
        value={state.breakTime}
        onChange={(x) => dispatch({ type: 'setBreakTime', payload: x })} />
      <Link to={`/timer/${state.currentTaskId}`} className="btn btn-primary">OK</Link>
    </div>
  );
}

function IntervalConfig({ id, label, value, onChange }) {
  const inputRef = React.createRef();
  const changeValue = (change) => {
    const value = Math.max(0, Number(inputRef.current.value) + change);
    inputRef.current.value = value;
    onChange && onChange(value);
  };
  const onInput = (e) => {
    onChange && onChange(Number(e.target.value));
  };

  return (
    <div className="interval-config columns">
      <div className="column">
        <label className="form-label" htmlFor={id}>{label}</label>
      </div>
      <div className="column col-auto">
        <div className="interval-changer input-group">
          <button className="btn btn-primary input-group-btn" onClick={() => changeValue(-1)}>
            <i className="icon icon-minus"></i>
          </button>
          <input id={id} ref={inputRef} type="number" className="form-input" defaultValue={value} onInput={onInput} />
          <button className="btn btn-primary input-group-btn" onClick={() => changeValue(+1)}>
            <i className="icon icon-plus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TimerSettings;
