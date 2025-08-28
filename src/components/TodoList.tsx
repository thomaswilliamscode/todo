import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';
import { useParams } from 'react-router-dom'
import AddTodoForm from './AddTodoForm'

export default function TodoList() {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error('TodoContext is undefined');
  }
  const { sidebarState, setSidebarState, deleteTodo } = todoContext;
  let { id } = useParams()
  const listId = id ? Number(id) : null;

  function displayTodo () {
    const data = sidebarState.data
    const found = data.find( (obj) => {
      if ((obj.id === listId) && obj.type === 'list') {
        return obj
      }
    })
    const todos = found?.todos

    return (
      <div>
        <AddTodoForm id={listId!} type={'list'} />
        <ul>
          {todos?.map((todo) => {
            if (!todo.completed) {
              return (
                <li
                  className='todoItem'
                  key={todo.id}
                >
                  <span></span>
                  <span>{todo.title}</span>
                  <button className='del-btn' onClick={() => deleteTodo(todo.id)}>Delete</button>
                </li>
              );
            }
          })}
        </ul>
      </div>
    );
  }

  return (
    <>
      <h1>TodoList Page Here</h1>
      {displayTodo()}

    </>
  );
}
