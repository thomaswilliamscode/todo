import { createContext, useContext, useState } from 'react';

import type { StateData } from '../types/state-data'
import type { Todo } from '../types/todo'

export interface TodoContextType {
  sidebarState: StateData;
  setSidebarState: React.Dispatch<React.SetStateAction<StateData>>;
  deleteTodo: (id: number) => void;
  currentTask: Todo | null ;
  setCurrentTask: React.Dispatch<React.SetStateAction<Todo | null >> ;
  // holdTodo: (id: number) => void;
  skipTodo: () => void; 
}

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const useTodoContext = (): TodoContextType => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  return context;
};
