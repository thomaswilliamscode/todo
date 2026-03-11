import { v4 as uuidv4 } from "uuid";

export const folder1Id: string = uuidv4();
export const folder2Id: string = uuidv4();

export const list1Id: string = uuidv4();
export const list2Id: string = uuidv4();
export const list3Id: string = uuidv4();
export const list4Id: string = uuidv4();

export const data = [
  {
    type: "folder",
    id: folder1Id,
    name: "🔥 Daily Rituals",
    open: true,
  },
  {
    type: "folder",
    id: folder2Id,
    name: "📦 Content",
    open: true,
  },
  {
    type: "list",
    id: list1Id,
    name: "Today!!!",
    folderId: folder1Id,
    todos: [{ id: "1", title: "test", completed: false }],
  },
  {
    type: "list",
    id: list2Id,
    name: "Focus Tasks",
    folderId: folder1Id,
    todos: [{ id: "2", title: "shower", completed: false }],
  },
  {
    type: "list",
    id: list3Id,
    name: "Video Ideas",
    folderId: folder2Id,
    todos: [{ id: "3", title: "walk dogs", completed: false }],
  },
  {
    type: "list",
    id: list4Id,
    name: "Clips to Post",
    folderId: folder2Id,
    todos: [{ id: "4", title: "rant", completed: false }],
  },
];
