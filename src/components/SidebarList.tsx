import type { List } from '../types/list'
import type { Todo } from '../types/todo'
import type TodoList from './TodoList'
import { useParams, Link } from 'react-router-dom'
import type { StateData } from './types/state-data';
import { useTodoContext } from '../context/TodoContext'


type Props = {
  obj: StateData;
}



export default function SidebarList ( { obj }: Props) {
  const { name, id } = obj
  const { id: activeId } = useParams();
  const { sidebarState, setSidebarState } = useTodoContext()



  function deleteList (id: number) {
    const filteredState = sidebarState.data.filter( (obj) => {
      if ((id === obj.id) && (obj.type === 'list')) {
        return false
      } else return true
    } )

    setSidebarState( (prev) => ({
      ...prev,
      data: filteredState
    }))
  }

  function lookForInbox (id) {
    if (id === 0) {
      return (
        <div className='sidebar-ul-no-folder del-btn-inbox'>
          <span className='no-folder-list-styling-span'></span>
          <Link to={`/list/${id}`}>{name}</Link>
        </div>
      );
    }
  }

  function regularSidebar () {
    console.log(id)
    return (
      <div className='sidebar-ul-no-folder'>
      <span className='no-folder-list-styling-span'></span>
      <Link to={`/list/${id}`}>{name}</Link>
      <button
        className='del-btn'
        onClick={() => deleteList(id)}
      >
        Delete
      </button>
    </div>
    )
  }


  return <>{id === 0 ? lookForInbox(id) : regularSidebar()}</>;
}