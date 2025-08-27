import { useParams } from 'react-router-dom'
import { useTodoContext } from '../context/TodoContext'
import TodoList from './TodoList'

export default function FolderPage () {
  const { sidebarState } = useTodoContext()
  const { id } = useParams();

  const folderNumber = Number(id);

  
  const folder = sidebarState.data.filter( (obj) => (obj.id === folderNumber) && (obj.type === 'folder'))
  const lists = sidebarState.data.filter( (obj) => {
    if (obj.folderId === folderNumber && obj.type === 'list') {
      console.log('OBJ: ' + obj.name);
      return obj;
    }
  })
  const output = lists.map( (obj) => {
    console.log(`${Date.now()} - ${obj.id}`);
    return (
      <div key={`${Date.now()} - ${obj.id}`}>
        <TodoList />
      </div>
    );
  })
  console.log(lists)
  

  return (
    <>
      <p>Folder page here!!!!</p>
      {output}

    </>
  )
}