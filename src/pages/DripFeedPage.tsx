import { useState, useEffect } from 'react'
import { useTodoContext } from '../context/TodoContext'
import type { Todo } from '../types/todo'
import AddTodoForm from '../components/AddTodoForm'

export default function DripFeedPage() {
  const { currentTask, setCurrentTask, sidebarState, setSidebarState, deleteTodo} = useTodoContext();
  const [ todos, setTodos ] = useState<Todo[]>([])

  useEffect ( () => {
    let next = defaultAlgo()
    setTodos(next)
  }, [] )

  const findLists = sidebarState.data.filter( (itemObj) => {
    if ( itemObj.type === 'list') {
      return itemObj.todos
    }
  })

  // refreshes focus page sideState data
  function focusRefresh () {
    let next = defaultAlgo();
    setTodos(next);
  }

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



  // grab first todo in todos list
  let first = todos[0]
  let listId = first.listId;

  // if no focus todos, nothing to do
  if (!todos || todos.length === 0) return;

  const data = sidebarState.data;
  const newState = data.map((obj) => {

    // keep folders and things without todos as-is
    if (obj.type === 'folder' || !obj.todos || obj.todos.length === 0) {
      return obj;
    }
    // if we find the list id
    if (obj.id === listId) {
      console.log('we in ')
      // we need to find target todo
      let newTodos = obj.todos.map((todo) => {
        if (todo.id !== first.id) {
          console.log('we in again');
          return todo;
        } else {
          console.log('we in else');
          let answer = {
            ...todo,
            completed: true,
          };
          return answer;
        }
      }); 
      return {
        ...obj,
        todos: newTodos,
      };
    } else {
      return obj
    }

  });

  setSidebarState( (prev) => ({
    ...prev, 
    data: newState
  }))

  console.log(newState)

  setTodos( (prev) => {
    if (prev.length <= 0) return prev;
    const [, ...rest] = prev
    return rest
  })


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


  function skipTodo() {
    // remove first todo from todos and save the newTodos to state
    setTodos((prev) => {
      if (prev.length === 0) return prev;
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  }

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
        <div id='focus-btn-div'>
          <button onClick={() => dripFeedDelete()}>Done</button>
          <button onClick={() => skipTodo()}>Skip</button>
          <button
            id='refresh-Btn'
            onClick={() => focusRefresh()}
          >
            Refresh
          </button>
        </div>
      </div>
      <div id='focus-add-task'>
        <AddTodoForm />
      </div>
    </div>
  );
}