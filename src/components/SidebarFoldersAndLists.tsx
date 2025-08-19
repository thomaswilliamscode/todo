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

  function showInfo () {
    const data = sidebarState.data;
    return data.map( (obj) => {
      const type = obj.type;
      const key = `${obj.type} - ${obj.id}`
      if (type === 'folder') {
        return (
          <SidebarFolder
            key={key}
            obj={obj}
            data={data}
          />
        );
      } if (type === 'list' && !obj.folderId) {
        return (
          <SidebarList 
            key={key}
            obj={obj}
          />
        )
      }
    });
      
      
  };

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
      {showInfo()}
    </div>
  )
}