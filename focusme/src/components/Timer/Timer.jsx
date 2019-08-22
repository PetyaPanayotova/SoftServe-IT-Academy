import React from 'react';
import { Link } from 'react-router-dom';

import { useStateValue } from '../../state';

import './Timer.css';

// class Timer extends Component {
  const Timer = (props) => {
    const [state, dispatch] = useStateValue();
    // get isRunning() {
    //   return Boolean(this.state.timeInterval);
    // }
    // let timeInterval = null;
    let isRunning = Boolean(state.timeInterval);
    let defaultTime = 1 * 60; // in seconds
    let taskId = props.match.params.id;

    // constructor(props) {
    //   super(props);
      
      // this.state = {
      //   taskId: props.match.params.id,
      //   task: props.location.state.task,
      //   time: props.location.state.sessionTime * 60,
      //   timeInterval: null,
      // };

      const renderTitle = () => {
        return (
          <ul className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Tasks</Link>
            </li>
            <li className="breadcrumb-item">
              <b>{state.task}</b>
            </li>
          </ul>
        );
      }
    
      // ref: https://codepen.io/JMChristensen/pen/Ablch
      const renderTime = () => {
        const minutes = Math.floor(state.sessionTime / 60);
        const seconds = (state.sessionTime % 60);
        const percent = Math.max(0, Math.min(state.sessionTime /  defaultTime * 100, 100));
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
    
      const renderActions = () => {
        return (
          <div className="timer-actions">
            <button className="btn btn-primary" onClick={onToggleRunning}>
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button className="btn" onClick={onReset} disabled={state.sessionTime === defaultTime}>
              Reset
            </button>
            <br />
            <Link className="btn" to={{ pathname: '/timer/settings', state: { taskId: taskId } }}>
              Configure
            </Link>
          </div>
        );
      }
    
      const onToggleRunning = () => {
        if (!isRunning) {
          startTimer();
        } else {
          pauseTimer();
        }
      }
    
      const onReset = () => {
        pauseTimer(true);
      }
    
      const startTimer = () => setInterval(() => {
              console.log(state.timeInterval)
              if (state.sessionTime > 0) {
                dispatch({ type: 'startTimer' })
                // state.sessionTime = state.sessionTime - 1;
              } else {
               pauseTimer(true);
              }
            }, 1000);

        // this.setState({
        //   ...this.state,
        //   timeInterval: setInterval(() => {
        //     if (this.state.time > 0) {
        //       this.setState({ ...this.state, time: this.state.time - 1 });
        //     } else {
        //       this.pauseTimer(true);
        //     }
        //   }, 1000)
        // });
    
      const pauseTimer = (reset) => {
        clearInterval(state.timeInterval);
        dispatch({ type: 'pauseTimer' });
        // clearInterval(this.state.timeInterval);
        // this.setState({
        //   ...this.state,
        //   timeInterval: null,
        //   time: reset ? this.defaultTime : this.state.time
        // });
      }
  
      return (
        <div>
          {renderTitle()}
          {renderTime()}
          {renderActions()}
        </div>
      );
    }

export default Timer;
