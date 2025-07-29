import { useState, useEffect } from 'react'
import { useTodoContext } from '../context/TodoContext'
import type { Todo } from '../types/todo'

export default function DripFeedPage() {
  const { currentTask, setCurrentTask, todos, deleteTodo, skipTodo } = useTodoContext();

  useEffect ( () => {
    const todo = todos[0]
    console.log(todo)
    console.log(currentTask);
    if (todo === currentTask) {
      console.log('same')
      return 
    }
    if ( todo !== currentTask) {
      setCurrentTask(todos[0]);
    }
    if ((!todo) && ( todos.length >  0 ) ) {
      console.log('test1');
      setCurrentTask( todos[0] )
    } else if ( currentTask && !todo) {
      console.log('test')
      setCurrentTask(null)
  }}, [ todos ] )


  return (
    <div>
      <div>
        <span className='span-container'></span>
        <li className='drip-feed-item'>
          <span></span>
          <h1>
            <span>{currentTask?.title}</span>
          </h1>
          <span></span>
        </li>
        <button onClick={() => deleteTodo(currentTask?.id) }>Done</button>
        {/* <button onClick={handleHold}>Hold</button> */}
        <button onClick={ () => skipTodo()}>Skip</button>
      </div>
    </div>
  );
}