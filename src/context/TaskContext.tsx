import React, { createContext, useContext, useState, ReactNode } from 'react';

import { fetchTasks, Task, updateTask } from '../lib/tasksApi';

interface TaskContextType {
  isTaskModalOpen: boolean;
  selectedDate: Date | null;
  editingTask: Task | null;
  openTaskModal: (date?: Date, task?: Task) => void;
  closeTaskModal: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const openTaskModal = (date?: Date, task?: Task) => {
    setSelectedDate(date || (task?.scheduledDate ? new Date(task.scheduledDate) : new Date()));
    setEditingTask(task || null);
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedDate(null);
    setEditingTask(null);
  };

  return (
    <TaskContext.Provider value={{ isTaskModalOpen, selectedDate, editingTask, openTaskModal, closeTaskModal }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskModal() {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskModal must be used within a TaskProvider');
  }
  return context;
}
