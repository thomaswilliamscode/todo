import { useContext, useState, useEffect  } from 'react';
import { TodoContext } from '../context/TodoContext';
import { useParams } from 'react-router-dom'
import AddTodoForm from './AddTodoForm'

export default function TodoList() {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error('TodoContext is undefined');
  }
  const { sidebarState, setSidebarState, deleteTodo } = todoContext;
  const { id } = useParams();
  const listId = id ? Number(id) : null;
  let title = 'test';
  

  


  function todoDelete (passedId) {
    
    const newTodos = filtered.filter( (obj) => {
      if (obj.id === passedId) {
        return false
      } else return true
    })
    const newMap = sidebarState.data.map((obj) => {
      if ((obj.id === listId) && (obj.type === 'list')){
        const newTodos = obj.todos.filter( t => t.id !== passedId)
        return {...obj, todos: newTodos}
      } else return obj;
    });
    setSidebarState( (prev) => ({
      ...prev,
      data: newMap
    }))
  }

  const found = sidebarState.data.find((obj) => {
    title = obj.name
    if (obj.id === listId && obj.type === 'list') {
      return true;
      
    } else {
      console.log(obj)
      return false;
    }
  });

  if (!found) {
    return (
      <>
        <p>List Not Found</p>
      </>
    )
  }

  
  const filtered = found.todos.filter((obj) => {
    if (!obj.completed) {
      return true;
    } else return false;
  });

  function listItem() {

      const mapped = filtered.map( (obj) => {
        const { title } = obj
        const key = obj.id;
        return (
          <div key={key}>
            <li className='todoItem'>
              <span></span>
              {title}
              <button onClick={ () => todoDelete(obj.id)}>Delete</button>
            </li>
          </div>
        );
      })
      return mapped 
  }

  return (
  <div>
    <h1>{title}</h1>
    <div id='list-todo'>
      <AddTodoForm id={listId} type={'list'}/>
    </div>
    
    <ul>
      {listItem()}
    </ul>
  </div>)
}
