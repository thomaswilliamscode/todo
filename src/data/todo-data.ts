import type { Todo } from "../types/todo";

import { 
  list1, list2, list3, list4, todo1, todo2, 
  todo3, todo4, todo5, todo6, todo7, todo8, todo9, 
  todo10, todo11, todo12, todo13, todo14, todo15 
} from "./helpers/id-info";


export const dummyData1: Todo[] = [
  {
    id: todo1,
    title: "first",
    completed: false,
    listId: list1,
  },
  {
    id: todo2,
    title: "Build a Todo App",
    completed: true,
    listId: list1,
  },
  {
    id: todo3,
    title: "second",
    completed: false,
    listId: list1,
  },
];

export const dummyData2: Todo[] = [
  {
    id: todo4,
    title: "third",
    completed: false,
    listId: list2,
  },
  {
    id: todo5,
    title: "oh ya",
    completed: true,
    listId: list2,
  },
  {
    id: todo6,
    title: "fourth",
    completed: false,
    listId: list2,
  },
];

export const dummyData3: Todo[] = [
  {
    id: todo7,
    title: "fith",
    completed: false,
    listId: list3,
  },
  {
    id: todo8,
    title: "love on ruby",
    completed: true,
    listId: list3,
  },
  {
    id: todo9,
    title: "sith",
    completed: false,
    listId: list3,
  },
];

export const dummyData4: Todo[] = [
  {
    id: todo10,
    title: "seventh",
    completed: false,
    listId: list4,
  },
  {
    id: todo11,
    title: "love on ruby",
    completed: true,
    listId: list4,
  },
  {
    id: todo12,
    title: "eight",
    completed: false,
    listId: list4,
  },
];

export const inboxData: Todo[] = [
  {
    id: todo13,
    title: "First Focus",
    completed: false,
    listId: "0",
  },
  {
    id: todo14,
    title: "Second Focus",
    completed: true,
    listId: "0",
  },
  {
    id: todo15,
    title: "Third Focus",
    completed: false,
    listId: "0",
  },
];
