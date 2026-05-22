import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TaskContextType {
  isTaskModalOpen: boolean;
  selectedDate: Date | null;
  openTaskModal: (date?: Date) => void;
  closeTaskModal: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const openTaskModal = (date?: Date) => {
    setSelectedDate(date || new Date());
    setIsTaskModalOpen(true);
  };

  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
    setSelectedDate(null);
  };

  return (
    <TaskContext.Provider value={{ isTaskModalOpen, selectedDate, openTaskModal, closeTaskModal }}>
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
