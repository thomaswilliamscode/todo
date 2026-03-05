import SidebarFoldersAndLists from "./SidebarFoldersAndLists";
import "../Styles/sidebar.css";
import { useTodoContext } from "../context/TodoContext";

export default function Sidebar() {
  const { setFocus } = useTodoContext();
  return (
    <div id="sidebar" onClick={() => setFocus("sidebar")}>
      <SidebarFoldersAndLists />
    </div>
  );
}
