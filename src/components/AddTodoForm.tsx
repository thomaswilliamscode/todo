import React, { useState } from "react";
import { useTodoContext } from "../context/TodoContext";
import "../Styles/add-todo-form.css";
import { v4 as uuidv4 } from "uuid";

type Props = {
  id?: string;
  type?: string;
  mode?: "Focus";
};

export default function AddToDoForm({ id, mode }: Props) {
  const [input, setInput] = useState("");
  const [showMessage, setshowMessage] = useState(false);
  const [message, setMessage] = useState(`added ${input}`);
  const [fadeOut, setFadeOut] = useState(false);
  const { setSidebarState } = useTodoContext();

  function test(data: string): string {
    return data
      .split(" ")
      .filter(Boolean) // remove empty strings
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!input.trim()) return;

    // Focus Mode may render this form without an explicit list id.
    // Default to Inbox (id 0).
    const resolvedListId = id ?? '0';

    const newTodo = {
      id: uuidv4(),
      title: test(input),
      completed: false,
      listId: resolvedListId,
    };

    setSidebarState((prev) => ({
      ...prev,
      data: prev.data.map((item) =>
        item.type === "list" && item.id === resolvedListId
          ? { ...item, todos: [...item.todos, newTodo] }
          : item
      ),
    }));

    if (mode === "Focus") {
      setMessage(`Added ${test(input)}`); // store current message
      setshowMessage(true);
      setFadeOut(false); // start fully visible

      setTimeout(() => setFadeOut(true), 1500); // fade begins
      setTimeout(() => setshowMessage(false), 2500); // remove after fade
    }

    setInput("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`folder-add-todo-form ${mode === "Focus" ? "focus" : ""}`}
    >
      <div className="form-input-and-add">
        <input
          className="add-input"
          type="text"
          placeholder="Action"
          onChange={(e) => setInput(e.target.value)}
          value={input}
        />
        <button className="add-btn" type="submit">
          Add
        </button>
      </div>
      {showMessage && (
        <div className={`hidden-message ${fadeOut ? "fade" : ""}`}>
          <p>{message}</p>
        </div>
      )}
    </form>
  );
}
