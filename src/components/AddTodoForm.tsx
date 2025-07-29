import React, { useState } from 'react';
import { TodoContext, useTodoContext } from '../context/TodoContext';

export default function AddToDoForm() {
  const [input, setInput] = useState('');
  const { todos, setTodos } = useTodoContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: input,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInput('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        className='add-input'
        type='text'
        placeholder='Task'
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <button
        className='add-btn'
        type='submit'
      >
        Add
      </button>
    </form>
  );
}
