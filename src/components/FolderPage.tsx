import { useParams } from 'react-router-dom'
import { useTodoContext } from '../context/TodoContext'
import FolderTodos from './FolderTodos'
import type { List } from '../types/list'

export default function FolderPage () {
  const { sidebarState } = useTodoContext()
  const { id } = useParams();

  const folderNumber = Number(id);

  
  const folder = sidebarState.data.find(
    (obj) => obj.type === 'folder' && obj.id === folderNumber
  );
  const lists = sidebarState.data.filter(
    (obj): obj is List => obj.type === 'list' && obj.folderId === folderNumber
  );
  const output = lists.map((obj) => {
    return (
      <div key={obj.id}>
        <FolderTodos data={obj} />
      </div>
    );
  });
  const title = folder?.name ?? 'Folder';

  return (
    <>
      <h1>{title}</h1>
      {output}

    </>
  )
}