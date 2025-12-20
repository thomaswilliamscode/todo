import { useState, useContext } from 'react'
import AddTodoForm from './AddTodoForm'
import { TodoContext } from '../context/TodoContext'
import type { List } from '../types/list'
import type { Todo } from '../types/todo'

type Props = {
  data: List;
}

export default function FolderTodos({ data }: Props) {
  const todoContext = useContext(TodoContext);
    if (!todoContext) {
      throw new Error('TodoContext is undefined');
    }
    const { sidebarState, setSidebarState } = todoContext;
    const { id, type } = data
    const [input, setInput] = useState('')

  function todoDelete(todoObj: Todo, listData: List) {
    const newData = sidebarState.data.map((objItem) => {
      // Only lists have `todos`
      if (objItem.type === 'list' && objItem.id === listData.id) {
        const todoArrayMap = objItem.todos.map((insideTodoObj) => {
          if (todoObj.id === insideTodoObj.id) {
            return { ...insideTodoObj, completed: true };
          }
          return insideTodoObj;
        });

        return { ...objItem, todos: todoArrayMap };
      }

      return objItem;
    });

    setSidebarState((prev) => ({
      ...prev,
      data: newData,
    }));
  }

  function displayTodos(listData: List) {
    const display = listData.todos
      .filter((t) => !t.completed)
      .map((t) => (
        <li key={`${t.id}`} className='folder-todos todoItem'>
          <span></span>
          <span>{t.title}</span>
          <button onClick={() => todoDelete(t, listData)}>Delete</button>
        </li>
      ));

    return display;
  }

  return (
    <div>
      <div className='folder-name-and-add-container'>
        <h3 className='folder-todo-title'>{data.name}</h3>
        <AddTodoForm id={id} type={type} />
      </div>
      <ul className='folder-ul'>{displayTodos(data)}</ul>
    </div>
  );
}