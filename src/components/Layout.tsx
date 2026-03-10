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
    const { source, destination } = result;
    console.log(`Source: `, source);
    console.log(`Destination: `, destination);

    if (!destination) return;

    setSidebarState((prev) => {
      const data = [...prev.data];

      const sourceList = data.find(
        (item): item is List =>
          item.type === "list" && item.id === source.droppableId
      );

      const destList = data.find(
        (item): item is List =>
          item.type === "list" && item.id === destination.droppableId
      );

      console.log(`SourceList: `, sourceList);
      console.log("DestList: ", destList);

      if (!sourceList || !destList) return prev;

      // REORDER WITHIN SAME LIST
      if (source.droppableId === destination.droppableId) {
        const newTodos = [...sourceList.todos];

        const [moved] = newTodos.splice(source.index, 1);
        newTodos.splice(destination.index, 0, moved);

        const newData = data.map((item) =>
          item.id === sourceList.id ? { ...item, todos: newTodos } : item
        );

        return { ...prev, data: newData };
      }

      // MOVE BETWEEN LISTS
      const sourceTodos = [...sourceList.todos];
      const destTodos = [...destList.todos];

      const [moved] = sourceTodos.splice(source.index, 1);
      destTodos.splice(destination.index, 0, moved);

      const newData = data.map((item) => {
        if (item.id === sourceList.id) {
          return { ...item, todos: sourceTodos };
        }
        if (item.id === destList.id) {
          return { ...item, todos: destTodos };
        }
        return item;
      });

      return { ...prev, data: newData };
    });
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
