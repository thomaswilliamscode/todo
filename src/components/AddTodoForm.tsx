import React, { useState } from 'react';

interface AddTodoFormProps {
  onSubmit: (todo: string) => void;
}

export default function AddToDoForm ( { onSubmit } = AddTodoFormProps) {
  const [ input, setInput ] = useState('')

  function handleSubmit ( e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if(!input.trim()) return;

    onSubmit(input)
    setInput('')

  }



  return (
    <form 
      onSubmit = {handleSubmit}>
      <input 
        type="text" 
        placeholder='Task'
        onChange={(e) => setInput(e.target.value)}
        />
      <button type='submit'>Add</button>
    </form>
  ) 

}