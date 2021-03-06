import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { StateProvider } from './state';
import './App.css';

import Index from "./components/Index/Index"
import Timer from "./components/Timer/Timer"
import TimerSettings from "./components/TimerSettings/TimerSettings"

const App = () => {
  const initialState = {
    breakTime: 5,
    currentTaskId: '',
    sessionTime: 25,
    tasks: [],
    timer: null,
  };

  const reducer = (state, action) => {
    state = { ...state, lastUpdate: Date.now() };
    switch (action.type) {
      case 'addTask':
        return {
          ...state,
          tasks: [
            ...state.tasks,
            action.payload
          ]
        };

      case 'setCurrentTaskId':
        return {
          ...state,
          currentTaskId: action.payload
        };

      case 'setSessionTime':
        return {
          ...state,
          sessionTime: action.payload
        };

      case 'setBreakTime':
        return {
          ...state,
          breakTime: action.payload
        };

      case 'setTimer':
        console.log('stored timer: ', action.payload ? 'object' : 'null')
        return {
          ...state,
          timer: action.payload
        };

      default:
        return state;
    }
  };

  return (
    <StateProvider initialState={initialState} reducer={reducer}>
      <Router>
        <div className="App">
          <header className="navbar">
            <section className="navbar-section">
              <Link to="/" className="navbar-brand mr-2">FocusMe</Link>
            </section>
          </header>

          <Route path='/' exact component={Index} />
          <Route path='/timer/:id(\d+)' exact component={Timer} />
          <Route path='/timer/settings' exact component={TimerSettings}/>
        </div>
      </Router>
    </StateProvider>
  );
}

export default App;
