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
    const { source, destination, type } = result;
    console.log(`Result: `, result);

    // handle todos in same list

    // handle todos in different list

    // handle list in same folders

    // handle list in different folders

    // handle folders
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
