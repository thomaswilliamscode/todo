import type { Folder } from '../types/folders'
import type { StateData } from './types/state-data'
import { Link } from 'react-router-dom'
import { useState } from 'react'

type Props = {
  obj: StateData;
  data: StateData;
}

export default function SidebarFolder ( {obj, data}: Props) {
  const { name } = obj
  const { isHidden, setIsHidden} = useState(obj.open)
  
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
      {name}
      <ul className={isHidden ? 'hidden' : 'visible'}>{listsInFolders()}</ul>
    </div>
  );
}