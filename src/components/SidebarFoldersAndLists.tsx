import { useTodoContext } from "../context/TodoContext";
import SidebarFolder from "./SidebarFolder";
import SidebarList from "./SidebarList";
import { NavLink } from "react-router-dom";
import "../Styles/sidebar.css";

export default function SidebarFoldersAndLists() {
  const { sidebarState } = useTodoContext();

  function showInfo() {
    const data = sidebarState.data;
    return data.map((obj) => {
      const type = obj.type;
      const key = `${obj.type} - ${obj.id}`;
      if (type === "folder") {
        return <SidebarFolder key={key} obj={obj} data={data} />;
      }
      if (type === "list" && !obj.folderId) {
        return <SidebarList key={key} obj={obj} />;
      }
    });
  }
  return (
    <div>
      <div id="sidebar-top">
        <div className="sidebar-add">
          <NavLink
            to="/add"
            end
            className={({ isActive }) =>
              isActive ? "add-link active" : "add-link"
            }
          >
            Add
          </NavLink>
        </div>
      </div>
      <div id="sidebar-bottom">{showInfo()}</div>
    </div>
  );
}
