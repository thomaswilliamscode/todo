import { useTodoContext } from '../context/TodoContext'
import SidebarFolder from './SidebarFolder'
import SidebarList from './SidebarList'



export default function SidebarFoldersAndLists () {
  const { sidebarState, setSidebarState } = useTodoContext()

  function seeFolders() {
    const data = sidebarState.data;
    const folders = data.filter( (obj) => {
      return obj.type === 'folder'
    })
    return folders.map( (folder) => {
      return <SidebarFolder key={folder.id} folder={folder}/>;
    })
  }

  function seeLists() {
    const data = sidebarState.data;
    const lists = data.filter((obj) => {
      return obj.type === 'list';
    });
    return lists.map((list) => {
      return (
        <SidebarList
          key={list.id}
          id={list.id}
          list={list}
          todos={list.todos}
        />
      );
    });
  }
  return (
    <div>
      {seeFolders()}
      {seeLists()}
    </div>
  )
}