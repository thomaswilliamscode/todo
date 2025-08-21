import SidebarFoldersAndLists from './SidebarFoldersAndLists'

export default function Sidebar () {
  return (
    <div id='sidebar'>
      <div id='sidebar-top'>
        <h1>SideBar</h1>
      </div>
      <div id='sidebar-bottom'>
        <p> Folder +</p>
        <p>Lists +</p>
        <SidebarFoldersAndLists />
      </div>
    </div>
  );
}