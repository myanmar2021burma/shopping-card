import trash from '../assets/trash-2.svg';
import{useStore} from '../store';
import classNames from 'classnames';
import './Task.css';

export default function Task({title}) {

  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const deleteTask = useStore((store) => store.deleteTask);
  const task = useStore((store) =>
    store.tasks.find((t) => t.title === title)
  );

  if (!task) {
    return null;
  }

  return (
    <div className="task" draggable onDragStart={() => setDraggedTask(task.title)}>
        <div>{task.title}</div>
        <div className="bottomWrapper">
       <div> 
      <img src={trash} alt="Delete" onClick={() => deleteTask(task.title)} />
      </div>
      <div className={classNames('status', task.state)}>{task.state}</div>
       
     
    </div>
     </div>
  );
}



