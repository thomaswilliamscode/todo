import type { List } from "../types/list";
import { dummyData1, dummyData2 } from "./todos";
import { list1, list2 } from "./id-info";

export const listData: List[] = [
  { type: "list", id: list1, name: "Today", todos: dummyData1 },
  { type: "list", id: list2, name: "Focus Tasks", todos: dummyData2 },
];
