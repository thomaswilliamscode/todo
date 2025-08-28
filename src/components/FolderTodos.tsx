import type { Todo } from '../types/todo'
import { useState } from 'react'
import AddTodoForm from './AddTodoForm'


type Props = {
  data: {
    type: 'list',
    id: number,
    name: string,
    todos: Todo[],
    folderId: number
  };
}

function displayTodos ( todos ) {
  const display = todos.map( (obj) => {
    if (!obj.completed) {
      return (
        <li
          key={`${obj.id}`}
          className='folder-todos todoItem'
        >
          <span></span>
          <span>{obj.title}</span>
          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      );
    }
  })

  return display
}
/*add TodoBtn
  use state for input value
  onclick - add todo
  setstate - previous, if type and id == same - add new todo array
 */



export default function FolderTodos({ data }: Props) {
    const { name, todos, id, folderId, type} = data
    const [ input, setInput ] = useState('')
    const key = Date.now()
  return (
    <div>
      <h1 className='todo-title'>{data.name}</h1>

      <div>
        <AddTodoForm
          id={id}
          type={type}
          key={key}
        />
      </div>
      <ul>{displayTodos(todos)}</ul>
    </div>
  );
}