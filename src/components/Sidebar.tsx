import SidebarFoldersAndLists from './SidebarFoldersAndLists'
import { Link } from 'react-router-dom'

export default function Sidebar () {
  return (
    <div id='sidebar'>
      <div id='sidebar-top'>
      </div>
      <div id='sidebar-bottom'>
        <div className='sidebar-add'>
          <Link id='add-link' to='/add'>Add</Link>
        </div>
        <SidebarFoldersAndLists />
      </div>
    </div>
  );
}