import type { Todo } from '../types/todo'
import { useState, useContext } from 'react'
import AddTodoForm from './AddTodoForm'
import { TodoContext } from '../context/TodoContext'


type Props = {
  data: {
    type: 'list',
    id: number,
    name: string,
    todos: Todo[],
    folderId: number
  };
}




export default function FolderTodos({ data }: Props) {
  const todoContext = useContext(TodoContext);
    if (!todoContext) {
      throw new Error('TodoContext is undefined');
    }
    const { sidebarState, setSidebarState } = todoContext;
    const { name, todos, id, folderId, type} = data
    const [ input, setInput ] = useState('')
    const key = Date.now()


  function todoDelete(todoObj, data) {
    let { type, id, name, todos, folderId } = data;

    let newData = sidebarState.data.map( (objItem) => {
      if(objItem.id === id && objItem.name === name) {
        let todoArrayMap = objItem.todos.map( (insideTodoObj) => {
          if (todoObj.id === insideTodoObj.id) {
            return {...insideTodoObj, completed: true}
          } 
          return insideTodoObj
        })
        return {...objItem, todos: todoArrayMap}
      } else {
        return objItem
      }
    })

    
    // find sidebarstatedata that matches data.name && data.id. 
    setSidebarState( (prev) => ({
      ...prev,
      data: newData
    }))
    // inside that todo array, find todoObj.id

    // set that to completed
    
  }

  function displayTodos(data) {
    // console.log(data)
    let { type, id, name, todos, folderId } = data
    const display = todos.map((obj) => {
      if (!obj.completed) {
        return (
          <li
            key={`${obj.id}`}
            className='folder-todos todoItem'
          >
            <span></span>
            <span>{obj.title}</span>
            <button onClick={() => todoDelete(obj, data)}>Delete</button>
          </li>
        );
      }
    });

    return display;
  }




  return (
    <div>
      <div className='folder-name-and-add-container'>
        <h3 className='folder-todo-title'>{data.name}</h3>
        <AddTodoForm
          id={id}
          type={type}
          key={key}
        />
      </div>
      <ul className='folder-ul'>{displayTodos(data)}</ul>
    </div>
  );
}