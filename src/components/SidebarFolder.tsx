import type { Folder } from '../types/folders'
import type { StateData } from './types/state-data'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import  useSidebarHooks from '../hooks/sidebarHooks'

type Props = {
  obj: Folder;
  data: StateData[];
}

export default function SidebarFolder ( {obj, data}: Props) {
  const { name, id } = obj
  const [ isOpen, setIsOpen] = useState(obj.open)
  // if (exists) {
  //   setIsOpen(true)
  // } else {
  //   setIsOpen(false)
  // }
  
  function listsInFolders () {
    return data.map( (info: StateData) => {
      if ((info.folderId === obj.id) && (info.type !== 'folder')) {
        
        return (
          <Link key={`${info.id} - ${obj.name}`} 
            to={`/list/${info.id}`}>
            <li className='listInFolder'>{info.name}</li>
          </Link>
        );
      }
    })
  }
  return (
    <div>
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

      <Link to={`/folder/${id}`}>
        {name}
      </Link>
      <button>Delete</button>
      <ul className={`lists-in-folder ${isOpen ? 'visible' : 'hidden'} `}>
        {listsInFolders()}
      </ul>
    </div>
  );
}