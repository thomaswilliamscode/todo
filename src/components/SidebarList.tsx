import type { List } from '../types/list'
import type { Todo } from '../types/todo'
import type TodoList from './TodoList'
import { useParams, Link } from 'react-router-dom'
import type { StateData } from './types/state-data';


type Props = {
  obj: StateData;
}

export default function SidebarList ( { obj }: Props) {
  const { name, id } = obj
  const { id: activeId } = useParams();
  return (
    <div>
      <Link to={`/list/${id}`}>{name}</Link>
    </div>
  );
}