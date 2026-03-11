import { useTodoContext } from "../context/TodoContext";
import SidebarFolder from "./SidebarFolder";
import SidebarList from "./SidebarList";
import { NavLink } from "react-router-dom";
import "../Styles/sidebar.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function SidebarFoldersAndLists() {
  const { sidebarState } = useTodoContext();

  function showInfo() {
    const data = sidebarState.data;
    return data.map((obj, index) => {
      const type = obj.type;
      const key = `${obj.type}-${obj.id}`;
      if (type === "folder") {
        return (
          <Draggable draggableId={`${key}`} index={index} key={key}>
            {(provided) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <SidebarFolder obj={obj} data={data} index={index} />
              </div>
            )}
          </Draggable>
        );
      }
      if (type === "list" && !obj.folderId) {
        return (
          <div key={key}>
            <SidebarList obj={obj} index={index} />
          </div>
        );
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
      <Droppable droppableId="sidebar-bottom" type="sidebar">
        {(provided) => (
          <div
            id="sidebar-bottom"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {showInfo()}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
