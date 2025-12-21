import type { Folder } from '../types/folder'
import type { List } from '../types/list'
import type { Inbox } from '../types/inbox'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useTodoContext } from '../context/TodoContext'

type SidebarItem = Folder | List | Inbox;

type Props = {
  obj: Folder;
  data: SidebarItem[];
}

export default function SidebarFolder ( {obj, data}: Props) {
  const { name, id } = obj
  const [ isOpen, setIsOpen] = useState(obj.open)
  const { sidebarState, setSidebarState } = useTodoContext()


  function deleteFolder(idOfFolder: number) {
    // remove the folder itself
    const withoutFolder = sidebarState.data.filter(
      (item) => !(item.type === 'folder' && item.id === idOfFolder)
    );

    // any lists that were inside this folder get moved to "none" (folderId 0)
    const remapped = withoutFolder.map((item) => {
      if (item.type === 'list' && item.folderId === idOfFolder) {
        return { ...item, folderId: 0 };
      }
      return item;
    });

    setSidebarState((prev) => ({
      ...prev,
      data: remapped,
    }));
  }

  

  function deleteList(idToDelete: number) {
    const filteredState = sidebarState.data.filter(
      (item) => !(item.type === 'list' && item.id === idToDelete)
    );

    setSidebarState((prev) => ({
      ...prev,
      data: filteredState,
    }));
  }

  
  function listsInFolders() {
    return data.map((info) => {
      // Only lists have folderId + are linkable as lists
      if (info.type === 'list' && info.folderId === obj.id) {
        return (
          <div className='sidebar-List-in-Folder' key={`${info.id}-${obj.id}`}>
            <span className='sidebar-List-in-Folder-styling-span'></span>
            <Link to={`/list/${info.id}`}>
              <li className='listInFolder'>{info.name}</li>
            </Link>
            <button className='del-btn' onClick={() => deleteList(info.id)}>
              Delete
            </button>
          </div>
        );
      }

      return null;
    });
  }
  return (
    <div>
      <div className='sidebar-folder'>
        <span></span>
        {isOpen ? (
          <i
            className='fa-solid fa-chevron-down'
            onClick={() => setIsOpen((prev) => !prev)}
          ></i>
        ) : (
          <i
            className='fa-solid fa-chevron-up'
            onClick={() => setIsOpen((prev) => !prev)}
          ></i>
        )}

        <Link to={`/folder/${id}`}>{name}</Link>
        <button
          className='del-btn'
          onClick={() => deleteFolder(id)}
        >
          Delete
        </button>
      </div>
      <ul
        className={`lists-in-folder sidebar-ul ${
          isOpen ? 'visible' : 'hidden'
        } `}
      >
        {listsInFolders()}
      </ul>
    </div>
  );
}