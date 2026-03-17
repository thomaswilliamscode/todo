import { useTodoContext } from "../context/TodoContext";
import { useState } from "react";
import type { FormType } from "../types/formType";
import { v4 as uuidv4 } from "uuid";
import "../Styles/add-folder-or-list.css";

export default function AddFolderOrList() {
  const { sidebarState, setSidebarState } = useTodoContext();
  const [formState, setFormState] = useState<FormType>({
    title: "",
    type: "list",
  });

  function listFoldersAsOptions() {
    const folders = sidebarState.data.filter((item) => item.type === "folder");

    return (
      <>
        {folders.map((folder) => (
          <option value={folder.id} key={folder.id}>
            {folder.name}
          </option>
        ))}
      </>
    );
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let arr = formState.title.split(" ");
    let newArr = arr.map((string) => {
      let newString = string.slice(0, 1).toUpperCase() + string.slice(1);
      return newString;
    });
    let newString = newArr.join(" ");

    let newItem: any;

    if (formState.type === "list") {
      newItem = {
        id: uuidv4(), // replace createId
        todos: [],
        type: "list",
        name: newString,
        folderId: formState.folderId || undefined,
      };
    } else if (formState.type === "folder") {
      newItem = {
        id: uuidv4(), // replace createId
        open: false,
        type: "folder",
        name: newString,
        folderId: formState.folderId || undefined,
      };
    }

    // add the new item to sidebar state
    setSidebarState((prev) => ({
      ...prev,
      data: [...prev.data, newItem],
    }));

    // reset form
    setFormState({
      title: "",
      type: "list",
    });
  }

  return (
    <>
      <form onSubmit={submit}>
        <div className="full-form-div">
          <div className="form-main-div">
            <input
              type="text"
              name="name"
              value={formState.title}
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
              placeholder="Title"
            />
            <div className="add-form-options">
              <input
                type="radio"
                value="list"
                id="list"
                name="type"
                checked={formState.type === "list"}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    type: e.target.value as FormType["type"],
                  })
                }
              />
              <label htmlFor="list"> Milestone </label>
              <input
                type="radio"
                value="folder"
                id="folder"
                name="type"
                checked={formState.type === "folder"}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    type: e.target.value as FormType["type"],
                  })
                }
              />

              <label htmlFor="folder"> Goal </label>
            </div>
          </div>
          <div className="folder-submit">
            <div
              className={`dropdown-slot ${
                formState.type === "list" ? "open" : "closed"
              }`}
            >
              <select
                onChange={(e) =>
                  setFormState((s) => ({
                    ...s,
                    folderId: e.target.value || undefined,
                  }))
                }
                name="folder"
                id="folder"
                className="form-select"
              >
                {listFoldersAsOptions()}
              </select>
            </div>
            <span>
              <button className="form-submit" type="submit">
                Submit
              </button>
            </span>
          </div>
        </div>
      </form>
    </>
  );
}
