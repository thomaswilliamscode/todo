import type { Folder } from "../types/folder";
import type { List } from "../types/list";
import type { Inbox } from "../types/inbox";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import "../Styles/sidebar.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";

type SidebarItem = Folder | List | Inbox;
type index = number;

type Props = {
  obj: Folder;
  data: SidebarItem[];
  index: index;
};

export default function SidebarFolder({ obj, data, index }: Props) {
  const { name, id } = obj;
  const [isOpen, setIsOpen] = useState(obj.open);
  const { sidebarState, setSidebarState } = useTodoContext();

  function deleteFolder(idOfFolder: string) {
    // remove the folder itself
    const withoutFolder = sidebarState.data.filter(
      (item) => !(item.type === "folder" && item.id === idOfFolder)
    );

    // any lists that were inside this folder get moved to "none" (folderId 0)
    const remapped = withoutFolder.map((item) => {
      if (item.type === "list" && item.folderId === idOfFolder) {
        return { ...item, folderId: undefined };
      }
      return item;
    });

    setSidebarState((prev) => ({
      ...prev,
      data: remapped,
    }));
  }

  function deleteList(idToDelete: string) {
    const filteredState = sidebarState.data.filter(
      (item) => !(item.type === "list" && item.id === idToDelete)
    );

    setSidebarState((prev) => ({
      ...prev,
      data: filteredState,
    }));
  }

  function listsInFolders() {
    return data.map((info, index) => {
      // Only lists have folderId + are linkable as lists
      if (info.type === "list" && info.folderId === obj.id) {
        let key = `listNFolder-${info.id}`;
        return (
          <Draggable draggableId={`${key}`} index={index} key={key}>
            {(provided) => (
              <div
                className="sidebar-List-in-Folder"
                key={`${info.id}-${obj.id}`}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <span id="sidebar-folder-text">
                  <span className="sidebar-List-in-Folder-styling-span"></span>

                  <NavLink
                    to={`/list/${info.id}`}
                    end
                    className={({ isActive }) =>
                      isActive ? "sidebar-list active" : "sidebar-list"
                    }
                  >
                    <li className="listInFolder">{info.name}</li>
                  </NavLink>
                </span>
                <button className="del-btn" onClick={() => deleteList(info.id)}>
                  Delete
                </button>
              </div>
            )}
          </Draggable>
        );
      }

      return null;
    });
  }
  return (
    <div>
      <div className="sidebar-folder">
        <span></span>
        {isOpen ? (
          <i
            className="fa-solid fa-chevron-down"
            onClick={() => setIsOpen((prev) => !prev)}
          ></i>
        ) : (
          <i
            className="fa-solid fa-chevron-up"
            onClick={() => setIsOpen((prev) => !prev)}
          ></i>
        )}

        <NavLink
          to={`/folder/${id}`}
          end
          className={({ isActive }) =>
            isActive ? "sidebar-list active" : "sidebar-list"
          }
        >
          {name}
        </NavLink>
        <button className="del-btn" onClick={() => deleteFolder(id)}>
          Delete
        </button>
      </div>
      <Droppable droppableId={`folder-${id}`} type="folder">
        {(provided) => (
          <ul
            ref={provided.innerRef}
            {...provided.droppableProps}
            className={`lists-in-folder sidebar-ul ${
              isOpen ? "visible" : "hidden"
            } `}
          >
            {listsInFolders()}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
