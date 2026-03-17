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
import type { Folder } from "../types/folder.ts";

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
    const { source, destination } = result;
    console.log(`Result: `, result);
    if (!destination) return;

    let fromId = source.droppableId;
    let toId = destination.droppableId;

    // handle todos in same list
    if (fromId.includes("list") && toId.includes("list")) {
      let sourceIndex = source.index;
      let destIndex = destination.index;
      let cleanId = fromId.replace("list-", "");
      let destCleanId = toId.replace("list-", "");

      // handle todos in different list
      if (cleanId !== destCleanId) {
        setSidebarState((prev) => {
          const newData = [...prev.data];
          // create source list todos !completed map
          let sourceList = newData.find(
            (obj): obj is List => obj.type === "list" && obj.id === cleanId
          );
          let destList = newData.find(
            (obj): obj is List => obj.type === "list" && obj.id === destCleanId
          );
          if (!sourceList || !destList) {
            return prev;
          }

          let sourceTodos = sourceList.todos.filter((obj) => !obj.completed);
          // create dest list todos !completed map

          // let destTodos = destList.todos.filter((obj) => !obj.completed);

          // remove from source list, and change listID
          let newDestTodos = [...destList.todos];

          let newSourceTodos = [...sourceTodos];
          const [oldSourceTodos] = newSourceTodos.splice(sourceIndex, 1);
          oldSourceTodos.listId = destCleanId;
          newDestTodos.splice(destIndex, 0, oldSourceTodos);

          // return new data

          return {
            ...prev,
            data: newData.map((item) => {
              if (!item) return null;
              if (item.id === destCleanId) {
                return {
                  ...item,
                  todos: newDestTodos,
                };
              }
              if (item.id === cleanId) {
                return {
                  ...item,
                  todos: newSourceTodos,
                };
              } else {
                return item;
              }
            }),
          };
        });
      } else {
        setSidebarState((prev) => {
          // create new array
          const newData = [...prev.data];
          // find listId
          let found = newData.find((item): item is List => item.id === cleanId);
          if (!found) return prev;
          // find index of found list
          let foundIndex = newData.findIndex((item) => item.id === cleanId);
          // get list obj based on foundIndex
          let newList = newData[foundIndex] as List;
          // filter for non-completed todos
          let foundUncompleted = (found.todos as Todo[]).filter((todo) => !todo.completed);
          if (!foundUncompleted) return prev;
          // copy non-completed todos
          let newTodos = [...foundUncompleted];
          // remove source index
          const [movedTodo] = newTodos.splice(sourceIndex, 1);
          movedTodo.listId = destCleanId;
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
    }

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
        const [movedData] = newData.splice(sourceIndex, 1) as [List];
        movedData.folderId = `${folderId}`;
        console.log(movedData);
        newData.splice(destIndex, 0, movedData);
        console.log(newData);

        return {
          ...prev,
          data: newData,
        };
      });
    }

    // handle folders in root

    if (fromId.includes("root-") && toId.includes("root-")) {
      let sourceIndex = source.index;
      let destIndex = destination.index;
      setSidebarState((prev) => {
        //copy data
        const newData = [...prev.data];
        // swap indexes source and dest
        const [movedData] = newData.splice(sourceIndex, 1);
        newData.splice(destIndex, 0, movedData);

        return {
          ...prev,
          data: newData,
        };
      });
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
