import React from 'react';
import { Link } from 'react-router-dom';
import { useStateValue } from '../../state';

import './TaskList.css';

const TaskList = ({ tasks }) => {
  return (
    <ul className="task-list container">
      {tasks.map(TaskItem)}
    </ul>
  );
}

const TaskItem = (content, id) => {
  const [state, dispatch] = useStateValue();

  return (
    <li key={id} className="columns">
      <div className="column">
        {content}
      </div>
      <div className="column col-auto">
        <Link to={{ pathname: `/timer/${id}`, state: { task: content, sessionTime: state.sessionTime } }}>
          <i className="icon icon-time"></i>
        </Link>
      </div>
    </li>
  );
}

export default TaskList;


