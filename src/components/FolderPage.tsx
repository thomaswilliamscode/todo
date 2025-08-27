import { useParams } from 'react-router-dom'
import { useTodoContext } from '../context/TodoContext'
import FolderTodos from './FolderTodos'

export default function FolderPage () {
  const { sidebarState } = useTodoContext()
  const { id } = useParams();

  const folderNumber = Number(id);

  
  const folder = sidebarState.data.filter( (obj) => (obj.id === folderNumber) && (obj.type === 'folder'))
  const lists = sidebarState.data.filter( (obj) => {
    if (obj.folderId === folderNumber && obj.type === 'list') {
      return obj;
    }
  })
  const output = lists.map( (obj) => {
    console.log(obj.todos);
    return (
      <div key={`${Date.now()} - ${obj.id}`}>
        
        <FolderTodos data={obj}/>
      </div>
    );
  })
  

  return (
    <>
      {output}

    </>
  )
}