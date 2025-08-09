import type { List } from '../types/list'
import type { Todo } from '../types/todo'
import type TodoList from './TodoList'
import { useParams, Link } from 'react-router-dom'

type Props = {
  list: List;
}

export default function SidebarList ( { list }: Props) {
  const { name, todos } = list
  const { id: activeId } = useParams();
  return (
    <div>
      <Link to={`/list/${list.id}`}>{list.name}</Link>
    </div>
  );
}