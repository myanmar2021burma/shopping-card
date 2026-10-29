import { useState } from 'react';
import { useStore } from '../store';
import { useShallow } from 'zustand/react/shallow';
import Task from './Task';
import './Column.css';
import classNames from 'classnames';

export default function Column({ state }) {
  const[dropped, setDropped] = useState(false);
  const draggedTask = useStore((store) => store.draggedTask);
  const moveTask = useStore((store) => store.moveTask);
  const setDraggedTask = useStore((store) => store.setDraggedTask);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState('');
  const addTask = useStore((store) => store.addTask);
  const tasks = useStore(
    useShallow((store) =>
      store.tasks.filter((task) => task.state === state)
    )
  );

  return (
    <div className={classNames('column', { drop:dropped })}
      onDragOver={(e) => {
        e.preventDefault();
        setDropped(true);
      }}
      onDragLeave={(e) => {setDropped(false);
        e.preventDefault();

      }}
      onDrop={() => {
        setDropped(false);
        moveTask(draggedTask, state);
        setDraggedTask(null);
      }}>
    
      <div className="titleWrapper">
        <p>{state}</p>
       <button onClick={() => setOpen(true)}>
          Add Task
        </button>
      </div>

      {tasks.map((task) => (
        <Task key={task.title} title={task.title} />
      ))}
      {open &&(
        <div className="Modal">
          <div className="ModalContent">
            <input onChange={(e) => setText(e.target.value)} value={text} />
            <button onClick={() => {
              addTask(text,state);
              setText('');
              setOpen(false);
            }}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
