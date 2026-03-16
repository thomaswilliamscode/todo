import { useContext } from "react";
import AddTodoForm from "./AddTodoForm";
import { TodoContext } from "../context/TodoContext";
import type { List } from "../types/list";
import type { Todo } from "../types/todo";
import { Droppable, Draggable } from "@hello-pangea/dnd";

type Props = {
  list: List;
};

export default function FolderTodos({ list }: Props) {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error("TodoContext is undefined");
  }
  const { sidebarState, setSidebarState } = todoContext;
  const { id, type } = list;

  function todoDelete(todoObj: Todo, listData: List) {
    const newData = sidebarState.data.map((objItem) => {
      // Only lists have `todos`
      if (objItem.type === "list" && objItem.id === listData.id) {
        const todoArrayMap = objItem.todos.map((insideTodoObj) => {
          if (todoObj.id === insideTodoObj.id) {
            return { ...insideTodoObj, completed: true };
          }
          return insideTodoObj;
        });

        return { ...objItem, todos: todoArrayMap };
      }

      return objItem;
    });

    setSidebarState((prev) => ({
      ...prev,
      data: newData,
    }));
  }

  function displayTodos(listData: List) {
    const display = listData.todos
      .filter((t) => !t.completed)
      .map((t, index) => (
        <Draggable
          draggableId={`list-${listData.id} - ${t.id}`}
          index={index}
          key={`list-${listData.id}-${t.id}`}
        >
          {(provided) => (
            <li
              className="folder-todos todoItem"
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <span></span>
              <span>{t.title}</span>
              <button
                className="del-btn-main"
                onClick={() => todoDelete(t, listData)}
              >
                Delete
              </button>
            </li>
          )}
        </Draggable>
      ));

    return display;
  }

  return (
    <div>
      <div className="folder-name-and-add-container">
        <h3 className="folder-todo-title">{list.name}</h3>
        <AddTodoForm id={id} type={type} />
      </div>
      <Droppable droppableId={list.id} type="folder-todos">
        {(provided) => (
          <ul
            className="folder-ul"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {displayTodos(list)}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
