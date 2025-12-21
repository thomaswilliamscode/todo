import React, { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';

type Props = {
  id?: number
  type?: string
}

export default function AddToDoForm( { id }: Props ) {
  const [input, setInput] = useState('');
  const { setSidebarState } = useTodoContext();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    if (id == null) return; // or throw, or show an error

    const newTodo = {
      id: Date.now(),
      title: input,
      completed: false,
      listId: id,
    };

    setSidebarState((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.type === 'list' && item.id === id
          ? { ...item, todos: [...item.todos, newTodo] }
          : item
      ),
    }));

    setInput('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='folder-add-todo-form'
    >
      <div className='form-input-and-add'>
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
      </div>
    </form>
  );
}
