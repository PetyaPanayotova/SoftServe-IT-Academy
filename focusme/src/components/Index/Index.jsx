import React from 'react';
import { useStateValue } from '../../state';
import TaskList from '../TaskList/TaskList';

import './Index.css';

function Index() {
  const [state, dispatch] = useStateValue();
  const inputRef = React.createRef();
  const onSubmit = (e) => {
    dispatch({ type: 'addTask', payload: inputRef.current.value });
    inputRef.current.value = '';
    inputRef.current.focus();
    e.preventDefault();
  }

  return (
    <div>
      <form className="task-form" onSubmit={onSubmit}>
        <div className="input-group input-inline">
          <input ref={inputRef} type="text" className="form-input" placeholder="What to do?" />
          <button className="btn btn-primary input-group-btn">Add</button>
        </div>
      </form>
      <TaskList tasks={state.tasks} />
    </div>
  );
}

export default Index;
