import type { List } from "../types/list";
import { dummyData1, dummyData2 } from "./todo-data";
import { list1, list2 } from "./helpers/id-info";

export const listData: List[] = [
  { type: "list", id: list1, name: "Today", todos: dummyData1 },
  { type: "list", id: list2, name: "Focus Tasks", todos: dummyData2 },
];
