import type { StateData } from "../types/state-data";
import {
  dummyData1,
  dummyData2,
  dummyData3,
  dummyData4,
  inboxData,
} from "./todos";

import { folder1Id, folder2Id } from "./folder-data";

import { list1, list2, list3, list4 } from "./id-info";

export const stateData: StateData = {
  data: [
    {
      type: "list",
      id: "0",
      name: "inbox",
      todos: inboxData,
    },
    {
      type: "list",
      id: list1,
      name: "Today",
      todos: dummyData1,
      folderId: folder1Id,
    },
    {
      type: "list",
      id: list2,
      name: "Focus Tasks",
      todos: dummyData2,
      folderId: folder1Id,
    },
    {
      type: "folder",
      id: folder1Id,
      name: "🔥 Daily Rituals",
      open: true,
    },
    {
      type: "list",
      id: list3,
      name: "💡 Standalone",
      todos: dummyData3,
      folderId: folder2Id,
    },
    {
      type: "folder",
      id: folder2Id,
      name: "Programming",
      open: false,
    },
    {
      type: "list",
      id: list4,
      name: "Focus Tasks",
      todos: dummyData4,
      folderId: folder2Id,
    },
  ],
};
