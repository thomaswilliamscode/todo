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
  );
}