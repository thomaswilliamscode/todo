import SidebarFoldersAndLists from './SidebarFoldersAndLists'
import AddFolderOrList from './AddFolderOrList'
import { Link } from 'react-router-dom'

export default function Sidebar () {
  return (
    <div id='sidebar'>
      <div id='sidebar-top'>
        <h1>SideBar</h1>
      </div>
      <div id='sidebar-bottom'>
        <div className='sidebar-add'>
          <Link to='/add'>Add</Link>
        </div>
        <SidebarFoldersAndLists />
      </div>
    </div>
  );
}