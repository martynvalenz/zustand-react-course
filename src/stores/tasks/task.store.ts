import { StateCreator, create } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { devtools, persist } from "zustand/middleware";
import {v4 as uuidV4} from 'uuid';
// import { produce } from "immer";
import { immer } from "zustand/middleware/immer";
interface TaskState {
  tasks:Record<string, Task>;
  draggingTaskId?: string;
  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status:TaskStatus) => void;
  setDraggingTaskId: (id: string) => void;
  removeDraggingTaskId: () => void;
  changeTaskStatus:(taskId: string, status: TaskStatus) => void;
  onTaskDrop: (status: TaskStatus) => void;
}

const storeApi: StateCreator<TaskState, [["zustand/devtools", never], ["zustand/persist", unknown], ["zustand/immer", never]]> = (set, get) => ({
  tasks:{
    'ABC-1':{id:'ABC-1', title:'Task 1', status:'open'},
    'ABC-2':{id:'ABC-2', title:'Task 2', status:'in-progress'},
    'ABC-3':{id:'ABC-3', title:'Task 3', status:'open'},
    'ABC-4':{id:'ABC-4', title:'Task 4', status:'open'},
  },
  draggingTaskId: undefined,
  getTaskByStatus:(status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter(task => task.status === status);
  },
  addTask: (title: string, status:TaskStatus) => {
    const newTask = {id:uuidV4(), title, status};
    //* Requires npm install immer
    // set(produce((state:TaskState) => {
    //   state.tasks[newTask.id] = newTask;
    // }));

    //* Without immer
    // set(state => ({
    //   tasks:{
    //     ...state.tasks,
    //     [newTask.id]:newTask
    //   }
    // }));

    //* With native immer
    set(state => {
      state.tasks[newTask.id] = newTask;
    }, false, 'addTask');
  },
  setDraggingTaskId: (id: string) => set({ draggingTaskId: id },false, 'setDragging'),
  removeDraggingTaskId: () => set({ draggingTaskId: undefined }, false, 'removeDragging'),
  changeTaskStatus:(taskId: string, status: TaskStatus) => {
    //* Without immer
    // const task = get().tasks[taskId];
    // task.status = status;
    // set(state => ({
    //   tasks:{
    //     ...state.tasks,
    //     [taskId]:task
    //   }
    // }));
    //* With native immer
    set(state => {
      state.tasks[taskId].status = status;
    }, false, 'changeTaskStatus')
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId;
    if(taskId){
      get().changeTaskStatus(taskId, status);
      get().removeDraggingTaskId();
    }
  }
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(
      immer(
        storeApi
      ), {name:'task-storage'}
    )
  )
);