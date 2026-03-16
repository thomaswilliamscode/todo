import Header from "./Header.tsx";
import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { TodoContext } from "../context/TodoContext.tsx";
import type { Todo } from "../types/todo.ts";
import Sidebar from "./Sidebar";
import { stateData } from "../data/sidebar-state";
import type { StateData } from "../types/state-data";
import "../Styles/layout.css";
import { DragDropContext } from "@hello-pangea/dnd";
import type { DropResult } from "@hello-pangea/dnd";
import type { List } from "../types/list.ts";

export default function Layout() {
  const [sidebarState, setSidebarState] = useState<StateData>(() => {
    const saved = localStorage.getItem("sidebarState");
    const parsed = JSON.parse(saved || "null");
    if (parsed && Array.isArray(parsed.data)) {
      return parsed;
    } else return stateData;
  });

  const [currentTask, setCurrentTask] = useState<Todo | null>(null);

  useEffect(() => {
    localStorage.setItem("sidebarState", JSON.stringify(sidebarState));
  }, [sidebarState]);

  function handleDelete(id: string) {
    const updatedTodos = sidebarState.data.filter((obj) => {
      if (obj.id === id && obj.type === "list") {
        return false;
      } else return true;
    });

    setSidebarState((prev) => ({
      ...prev,
      data: updatedTodos,
    }));
    console.log(sidebarState);
  }

  const [focus, setFocus] = useState<"home" | "sidebar" | "focus" | null>(null);

  function onDragEnd(result: DropResult) {
    const { source, destination, type, draggableId } = result;
    console.log(`Result: `, result);
    if (!destination) return;

    let fromId = source.droppableId;
    let toId = destination.droppableId;

    // handle todos in same list
    if (fromId.includes("list") && toId.includes("list")) {
      let sourceIndex = source.index;
      let destIndex = destination.index;
      let cleanId = fromId.replace("list-", "");

      setSidebarState((prev) => {
        // create new array
        const newData = [...prev.data];
        // find listId
        let found = newData.find((item) => item.id === cleanId);
        // find index of found list
        let foundIndex = newData.findIndex((item) => item.id === cleanId);
        // get list obj based on foundIndex
        let newList = newData[foundIndex];
        // filter for non-completed todos
        let foundUncompleted = found.todos.filter((todo) => !todo.completed);
        // copy non-completed todos
        let newTodos = [...foundUncompleted];
        // remove source index
        const [movedTodo] = newTodos.splice(sourceIndex, 1);
        // add destination index
        newTodos.splice(destIndex, 0, movedTodo);
        // set newState
        newData[foundIndex] = {
          ...newList,
          todos: newTodos,
        };
        // return newState
        return {
          ...prev,
          data: newData,
        };
      });
    }

    // handle todos in different list

    // handle list in same folders

    if (fromId.includes("folder") && toId.includes("folder")) {
      let folderId = destination.droppableId;
      let sourceId = source.droppableId;
      let sourceIndex = source.index;
      let destIndex = destination.index;
      folderId = folderId.replace("folder-", "");
      sourceId = sourceId.replace("folder-", "");

      setSidebarState((prev) => {
        // create new array
        const newData = [...prev.data];
        console.log(newData);
        console.log(newData[sourceIndex], newData[destIndex]);
        // find lists with folderId
        const [movedData] = newData.splice(sourceIndex, 1);
        movedData.folderId = `${folderId}`;
        console.log(movedData);
        newData.splice(destIndex, 0, movedData);
        console.log(newData);

        return {
          ...prev,
          data: newData,
        };
      });

      // handle list in different folders

      // handle folders
    }
  }

  return (
    <>
      <TodoContext.Provider
        value={{
          sidebarState,
          setSidebarState,
          deleteTodo: handleDelete,
          currentTask,
          setCurrentTask,
          focus,
          setFocus,
        }}
      >
        <Header />
        <DragDropContext onDragEnd={onDragEnd}>
          <div id="layout">
            <Sidebar />
            <main id="main">
              <Outlet />
            </main>
          </div>
        </DragDropContext>
      </TodoContext.Provider>
    </>
  );
}
