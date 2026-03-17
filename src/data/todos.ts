import type { Todo } from "../types/todo";
import { v4 as uuidv4 } from "uuid";

import { list1, list2, list3, list4 } from "./id-info";

const todo1: string = uuidv4();
const todo2: string = uuidv4();
const todo3: string = uuidv4();
const todo4: string = uuidv4();
const todo5: string = uuidv4();
const todo6: string = uuidv4();
const todo7: string = uuidv4();
const todo8: string = uuidv4();
const todo9: string = uuidv4();
const todo10: string = uuidv4();
const todo11: string = uuidv4();
const todo12: string = uuidv4();
const todo13: string = uuidv4();
const todo14: string = uuidv4();
const todo15: string = uuidv4();

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
    title: "eith",
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
