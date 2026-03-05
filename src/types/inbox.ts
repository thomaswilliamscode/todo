import type { Todo } from "./todo";

export interface Inbox {
  type: "inbox";
  name: "inbox";
  id: string;
  todos: Todo[];
}
