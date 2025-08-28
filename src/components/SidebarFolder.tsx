import type { Folder } from '../types/folders'
import type { StateData } from './types/state-data'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import  useSidebarHooks from '../hooks/sidebarHooks'
import { useTodoContext } from '../context/TodoContext'

type Props = {
  obj: Folder;
  data: StateData[];
}

export default function SidebarFolder ( {obj, data}: Props) {
  const { name, id } = obj
  const [ isOpen, setIsOpen] = useState(obj.open)
  const { sidebarState, setSidebarState } = useTodoContext()
  // if (exists) {
  //   setIsOpen(true)
  // } else {
  //   setIsOpen(false)
  // }

  /*Delete Function 
    onclick - update state to remove that sidebar folder
    set folder ID for any lists to zero - 
   */


  function deleteFolder (idOfFolder: number) {
    console.log('original State: ', sidebarState)
    const newState = sidebarState.data.filter( (obj) => {
      if ((obj.id === idOfFolder) && (obj.type === 'folder')) {
        return false
      } else return true
    })
    console.log('NewState ', newState)
    const newStateMapped = newState.map( (obj) => {
      if ((obj.folderId === idOfFolder) && (obj.type === 'list')) {
        console.log('in Mapped');
        obj.folderId = 0;
        return obj
      }
      return obj
    })
    setSidebarState( (prev) => ({
      ...prev,
      data: newStateMapped
    }))
  }

  

    function deleteList(id: number) {
      console.log('Id: ', id);
      const filteredState = sidebarState.data.filter((obj) => {
        if (id === obj.id && obj.type === 'list') {
          return false;
        } else return true;
      });

      setSidebarState((prev) => ({
        ...prev,
        data: filteredState,
      }));
    }

  
  function listsInFolders () {
    return data.map( (info: StateData) => {
      if ((info.folderId === obj.id) && (info.type !== 'folder')) {
        
        return (
          <div
            className='sidebar-List-in-Folder'
            key={`${info.id} - ${obj.name}`}
          >
            <span className='sidebar-List-in-Folder-styling-span'></span>
            <Link to={`/list/${info.id}`}>
              <li className='listInFolder'>{info.name}</li>
            </Link>
            <button
              className='del-btn'
              onClick={() => deleteList(info.id)}
            >
              Delete
            </button>
          </div>
        );
      }
    })
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