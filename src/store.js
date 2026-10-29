
import { produce } from 'immer';
import { create } from 'zustand';
import {
  devtools,
  persist,
  subscribeWithSelector,
} from 'zustand/middleware';

const log = (config) => (set, get, api) =>
  config(
    (...args) => {
      console.log(args);
      set(...args);
    },
    get,
    api
  );

export const useStore = create(
  subscribeWithSelector(
    devtools(
      persist(
        (set) => ({
          tasks: [],
          draggedTask: null,
          tasksInOngoing: 0,

          addTask: (title, state) =>
            set(
              produce((store) => {
                store.tasks.push({ title, state });
              }),
              false,
              'addTask'
            ),

          deleteTask: (title) =>
            set(
              (store) => ({
                tasks: store.tasks.filter(
                  (task) => task.title !== title
                ),
              }),
              false,
              'deleteTask'
            ),

          setDraggedTask: (title) =>
            set({ draggedTask: title }),

          moveTask: (title, state) =>
            set(
              (store) => ({
                tasks: store.tasks.map((task) =>
                  task.title === title ? { ...task, state } : task
                ),
              }),
              false,
              'moveTask'
            ),
        }),
        { name: 'store' }
      )
    )
  )
);

useStore.subscribe(
  (store) => store.tasks,
  (newTasks) => {
    const tasksInOngoing = newTasks.filter(
      (task) => task.state === 'ONGOING'
    ).length;

    useStore.setState({ tasksInOngoing });
  }
);
