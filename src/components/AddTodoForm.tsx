import React, { useState } from 'react';
import { TodoContext, useTodoContext } from '../context/TodoContext';

type Props = {
  id: number
  type: string
}

export default function AddToDoForm( {id, type}: Props ) {
  const [input, setInput] = useState('');
  const { sidebarState, setSidebarState } = useTodoContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      title: input,
      completed: false,
    };

    setSidebarState( prev => ( {
      ...prev, 
      data: prev.data.map( item => 
        item.type === 'list' && item.id === id
        ? {...item, todos: [...item.todos, newTodo]}
        : item
      )

    }) )

    
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
