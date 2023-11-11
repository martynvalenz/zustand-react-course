import { DragEvent, useState } from 'react';
import { IoAddOutline, IoCheckmarkCircleOutline, IoEllipsisHorizontalOutline } from 'react-icons/io5';
import type { Task, TaskStatus } from '../../interfaces';
import { SingleTask } from './SingleTask';
import { useTaskStore } from '../../stores';
import classNames from 'classnames';
import Swal from 'sweetalert2';

interface Props {
  title: string;
  tasks: Task[];
  value: TaskStatus;
}


export const JiraTasks = ({ title, tasks, value }: Props) => {
  const isDragging = useTaskStore(state => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);
  const addTask = useTaskStore(state => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);
  const handleAddTask = async() => {
    const res = await Swal.fire({
      title: 'Add Task',
      input: 'text',
      inputLabel: 'Task Title',
      inputPlaceholder: 'Enter Task Title',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'You need to write something!'
        }
      }
    });
    addTask(res.value, value);
  }
  
  const handleDragOver = (e:DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  }
  const handleDragLeave = (e:DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  }
  const handleOnDrop = (e:DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(value);
  }
  return (
    <div
      onDragOver={handleDragOver}
      onDragEnter={handleDragLeave}
      onDrop={handleOnDrop}
      className={
        classNames('!text-black border-4 relative flex flex-col rounded-[20px]  bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-4 3xl:p-![18px]', {
          'border-green-500': isDragging && onDragOver,
          'border-blue-500': isDragging,
        })
      }
    >
      {/* Task Header */ }
      <div className="relative flex flex-row justify-between">

        <div className="flex items-center justify-center">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100">
            <span className="flex justify-center items-center h-6 w-6 text-brand-500">
              <IoCheckmarkCircleOutline style={ { fontSize: '50px' } } />
            </span>
          </div>

          <h4 className="ml-4 text-xl font-bold text-navy-700">{ title }</h4>
        </div>

        <button onClick={handleAddTask}>
          <IoAddOutline />
        </button>

      </div>
      <div className="h-full w-full">
        {
          tasks.map(task => (
            <SingleTask task={task} key={task.id} />
          ))
        }
      </div>
      
    </div>
  );
};