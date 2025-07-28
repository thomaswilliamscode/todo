import Header from './Header.tsx';
import { Outlet } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { TodoContext } from '../app/context/TodoContext.tsx';
import type { Todo } from '../types/todo.ts';
import { dummyData } from '../data/todos.ts';

export default function Layout() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : dummyData;
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function handleDelete(id: number) {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    return setTodos(updatedTodos);
  }

  return (
    <>
      <TodoContext.Provider
        value={{ todos, setTodos, deleteTodo: handleDelete }}
      >
        <Header />
        <main>
          <Outlet />
        </main>
      </TodoContext.Provider>
    </>
  );
}
