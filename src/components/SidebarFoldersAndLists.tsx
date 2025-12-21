import { useTodoContext } from '../context/TodoContext'
import SidebarFolder from './SidebarFolder'
import SidebarList from './SidebarList'



export default function SidebarFoldersAndLists () {
  const { sidebarState, } = useTodoContext()

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
  return (
    <div>
      {showInfo()}
    </div>
  )
}