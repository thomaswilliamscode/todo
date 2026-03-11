import { useParams } from "react-router-dom";
import { useTodoContext } from "../context/TodoContext";
import FolderTodos from "./FolderTodos";
import type { List } from "../types/list";
import "../Styles/folder-page.css";

export default function FolderPage() {
  const { sidebarState } = useTodoContext();
  const { id } = useParams();

  const folderId = id;

  const folder = sidebarState.data.find(
    (obj) => obj.type === "folder" && obj.id === folderId
  );

  const lists = sidebarState.data.filter(
    (obj): obj is List => obj.type === "list" && obj.folderId === folderId
  );

  const output = lists.map((obj) => {
    return (
      <div key={obj.id}>
        <FolderTodos list={obj} folder={folder} />
      </div>
    );
  });

  const title = folder?.name ?? "Folder";

  return (
    <>
      <h1 className="title">{title}</h1>
      {output}
    </>
  );
}
