import { useContext } from "react";
import { TodoContext } from "../context/TodoContext";
import { useParams } from "react-router-dom";
import AddTodoForm from "./AddTodoForm";
import type { List } from "../types/list";
import type { Todo } from "../types/todo";
import "../Styles/todo-list.css";
import { Droppable, Draggable } from "@hello-pangea/dnd";

export default function TodoList() {
  const todoContext = useContext(TodoContext);
  if (!todoContext) {
    throw new Error("TodoContext is undefined");
  }
  const { sidebarState, setSidebarState } = todoContext;
  const { id } = useParams();
  const listId = id;
  let title = "test";

  function todoDelete(passedId: string) {
    const newMap = sidebarState.data.map((obj) => {
      if (obj.type === "list" && obj.id === listId) {
        const newTodos = obj.todos.filter((t: Todo) => t.id !== passedId);
        return { ...obj, todos: newTodos };
      }
      return obj;
    });

    setSidebarState((prev) => ({
      ...prev,
      data: newMap,
    }));
  }

  const found = sidebarState.data.find(
    (obj): obj is List => obj.type === "list" && obj.id === listId
  );

  if (found) {
    title = found.name;
  }

  if (!found) {
    return (
      <>
        <p>List Not Found</p>
      </>
    );
  }

  const filtered: Todo[] = found.todos.filter((t: Todo) => !t.completed);

  function listItem() {
    const mapped = filtered.map((obj: Todo, index) => {
      const key = obj.id;
      return (
        <Draggable draggableId={`main-${key}`} index={index} key={key}>
          {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
              <li className="todoItem">
                <span></span>
                {obj.title}
                <button
                  className="del-btn-main"
                  onClick={() => todoDelete(obj.id)}
                >
                  Delete
                </button>
              </li>
            </div>
          )}
        </Draggable>
      );
    });
    return mapped;
  }
  if (!listId) {
    return <p>Invalid list</p>;
  }

  return (
    <div>
      <h1 className="title">{title}</h1>
      <div id="list-todo">
        <AddTodoForm id={listId ?? ""} type="list" />
      </div>

      <Droppable droppableId={listId} type="list">
        {(provided) => (
          <ul ref={provided.innerRef} {...provided.droppableProps}>
            {listItem()}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </div>
  );
}
