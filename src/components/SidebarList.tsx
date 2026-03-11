import { NavLink } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import type { List } from "../types/list";
import type { Inbox } from "../types/inbox";
import "../Styles/sidebar.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";

type SidebarItem = List | Inbox;
type index = number;

type Props = {
  obj: SidebarItem;
  index: index;
};

export default function SidebarList({ obj, index }: Props) {
  const { name, id } = obj;
  const { sidebarState, setSidebarState } = useTodoContext();

  function deleteList(id: string) {
    const filteredState = sidebarState.data.filter(
      (item) => !(item.type === "list" && item.id === id)
    );

    setSidebarState((prev) => ({
      ...prev,
      data: filteredState,
    }));
  }

  function lookForInbox(id: string) {
    if (id === "0") {
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
      <Draggable draggableId={`sidebar-list-${id}`} index={index} key={id}>
        {(provided) => (
          <div
            className="sidebar-ul-no-folder"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
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
        )}
      </Draggable>
    );
  }

  return <>{id === "0" ? lookForInbox(id) : regularSidebar()}</>;
}
