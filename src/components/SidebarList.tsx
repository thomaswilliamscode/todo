import { NavLink } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import type { List } from "../types/list";
import type { Inbox } from "../types/inbox";
import "../Styles/sidebar.css";

type SidebarItem = List | Inbox;

type Props = {
  obj: SidebarItem;
};

export default function SidebarList({ obj }: Props) {
  const { name, id } = obj;
  const { sidebarState, setSidebarState } = useTodoContext();

  function deleteList(id: number) {
    const filteredState = sidebarState.data.filter(
      (item) => !(item.type === "list" && item.id === id)
    );

    setSidebarState((prev) => ({
      ...prev,
      data: filteredState,
    }));
  }

  function lookForInbox(id: number) {
    if (id === 0) {
      return (
        <div className="sidebar-ul-no-folder del-btn-inbox">
          <span className="no-folder-list-styling-span"></span>
          <NavLink
            to={`/list/${id}`}
            end
            className={({ isActive }) =>
              isActive ? "sidebar-list active" : "sidebar-list"
            }
          >
            {name}
          </NavLink>
        </div>
      );
    }

    return null;
  }

  function regularSidebar() {
    return (
      <div className="sidebar-ul-no-folder">
        <span className="no-folder-list-styling-span"></span>
        <NavLink
          to={`/list/${id}`}
          end
          className={({ isActive }) =>
            isActive ? "sidebar-list active" : "sidebar-list"
          }
        >
          {name}
        </NavLink>
        <button className="del-btn" onClick={() => deleteList(id)}>
          Delete
        </button>
      </div>
    );
  }

  return <>{id === 0 ? lookForInbox(id) : regularSidebar()}</>;
}
