import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { useParams } from 'react-router-dom'
import AddTodoForm from './AddTodoForm'
import type { List } from '../types/list'
import type { Todo } from '../types/todo'

export default function TodoList() {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error('TodoContext is undefined');
  }
  const { sidebarState, setSidebarState } = todoContext;
  const { id } = useParams();
  const listId = id ? Number(id) : undefined;
  let title = 'test';
  
  function todoDelete(passedId: number) {
    const newMap = sidebarState.data.map((obj) => {
      if (obj.type === 'list' && obj.id === listId) {
        const newTodos = obj.todos.filter((t: Todo) => t.id !== passedId);
        return { ...obj, todos: newTodos };
      }
      return obj;
    });

    setSidebarState((prev) => ({
      ...prev,
      data: newMap,
    }));
  }

  const found = sidebarState.data.find(
    (obj): obj is List => obj.type === 'list' && obj.id === listId
  );

  if (found) {
    title = found.name;
  }

  if (!found) {
    return (
      <>
        <p>List Not Found</p>
      </>
    )
  }

  
  const filtered: Todo[] = found.todos.filter((t: Todo) => !t.completed);

  function listItem() {

      const mapped = filtered.map((obj: Todo) => {
        const key = obj.id;
        return (
          <div key={key}>
            <li className='todoItem'>
              <span></span>
              {obj.title}
              <button onClick={() => todoDelete(obj.id)}>Delete</button>
            </li>
          </div>
        );
      });
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
