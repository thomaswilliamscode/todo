import { useContext } from 'react';
import { TodoContext } from '../context/TodoContext';

export default function TodoList() {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error('TodoContext is undefined');
  }
  const { todos, setTodos, deleteTodo } = todoContext;

  return (
    <>
      {/* <ul>
        {todos.map((todo) => {
          return (
            <li
              className='todoItem'
              key={todo.id}
            >
              <span></span>
              <span>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
            </li>
          );
        })}
      </ul> */}
    </>
  );
}
