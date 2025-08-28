import type { Todo } from '../types/todo'


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
          <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
        </li>
      );
    }
  })

  return display
}

export default function FolderTodos({ data }: Props) {
    const { name, todos, id} = data
  return (
    <>
      {data.name}
      <ul >{displayTodos(todos)}</ul>
    </>
  );
}