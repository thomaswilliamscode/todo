import type { List } from '../types/list'
import type { Todo } from '../types/todo'
import type TodoList from './TodoList'

type Props = {
  list: List;
  todos: Todo;
}

export default function SidebarList ( { list, todos }: Props) {
  return (
    <div>
      {list.name}
    </div>
  )
}