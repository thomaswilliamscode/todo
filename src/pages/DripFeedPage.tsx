import { useState, useEffect } from 'react'
import { useTodoContext } from '../context/TodoContext'
import type { Todo } from '../types/todo'
import AddTodoForm from '../components/AddTodoForm'

export default function DripFeedPage() {
  const { currentTask, setCurrentTask, sidebarState, setSidebarState, deleteTodo, skipTodo } = useTodoContext();
  const [ todos, setTodos ] = useState<Todo[]>([])

  useEffect ( () => {
    let next = defaultAlgo()
    setTodos(next)
  }, [sidebarState] )

  // have different display algorithim options

  // go through every list and find all todos

  const findLists = sidebarState.data.filter( (itemObj) => {
    if ( itemObj.type === 'list') {
      return itemObj.todos
    }
  })

// goes from top to bottom and displays each todo one at a time.
  function defaultAlgo () {
    let current = [];
    for ( let i = 0; i < findLists.length; i++ ) {
      for (let j = 0; j < findLists[i].todos.length; j++) {
        let todo = findLists[i].todos[j]
        if (!todo.completed) {
          current.push(todo);
        }
        
      }
    }
    return current
  }

function dripFeedDelete() {

  // if no focus todos, nothing to do
  if (!todos || todos.length === 0) return;

  const data = sidebarState.data;
  let completed = false;
  const newState = data.map((obj) => {

    // keep folders and things without todos as-is
    if (obj.type === 'folder' || !obj.todos || obj.todos.length === 0) {
      return obj;
    }
    let newTodos = obj.todos.map ( (todo) => {
      if (completed || todo.completed) {
        return todo
      } else {
        completed = true;
        
        let answer = {
          ...todo,
          completed: true,
        };
        return answer
      }
    }) 
    setTodos(newTodos)
    return {
      ...obj,
      todos: newTodos
    }

  });

  setSidebarState((prev) => ({
    ...prev,
    data: newState,
  }));
}




  useEffect ( () => {
    const todo = todos[0]
    if (todo === currentTask) {
      return 
    }
    if ( todo !== currentTask) {
      setCurrentTask(todos[0]);
    }
    if ((!todo) && ( todos.length >  0 ) ) {
      setCurrentTask( todos[0] )
    } else if ( currentTask && !todo) {
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
        
        /* needs to be current folderID and current todo id */

        <button onClick={() => dripFeedDelete()}>Done</button>
        {/* <button onClick={handleHold}>Hold</button> */}
        <button onClick={() => skipTodo()}>Skip</button>
      </div>
      <div id='focus-add-task'>
        <AddTodoForm />
      </div>
    </div>
  );
}