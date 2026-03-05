import type { Todo } from "./todo";

export interface List {
  type: "list";
  id: string;
  name: string;
  folderId?: number;
  todos: Todo[];
}
