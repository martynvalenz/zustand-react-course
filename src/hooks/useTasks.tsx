import { type DragEvent, useState } from 'react';
import { useTaskStore } from "../stores/tasks/task.store";
import Swal from 'sweetalert2';
import type { TaskStatus } from '../interfaces';

interface Options {
  status:TaskStatus;
}

export const useTasks = ({status}:Options) => {
  const isDragging = useTaskStore(state => !!state.draggingTaskId);
  const onTaskDrop = useTaskStore(state => state.onTaskDrop);
  const addTask = useTaskStore(state => state.addTask);

  const [onDragOver, setOnDragOver] = useState(false);
  const handleAddTask = async() => {
    const {isConfirmed, value} = await Swal.fire({
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
    if(!isConfirmed) return;
    addTask(value, status);
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
    onTaskDrop(status);
  }

  return {
    // Properties
    isDragging,
    // Methods
    onDragOver,
    handleDragOver,
    handleDragLeave,
    handleOnDrop,
    handleAddTask
  }
}