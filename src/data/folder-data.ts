import { v4 as uuidv4 } from "uuid";

import { folder1Id, folder2Id, folder3Id, folder4Id } from "./helpers/id-info";


export const list1Id: string = uuidv4();
export const list2Id: string = uuidv4();
export const list3Id: string = uuidv4();
export const list4Id: string = uuidv4();

export const data = [
  {
    id: folder1Id,
    name: "🔥 Daily Rituals",
    position: 0,
  },
  {
    id: folder2Id,
    name: "🏠 House Chores",
    position: 1,
  },
    {
    id: folder3Id,
    name: "</> Coding",
    position: 2,
  },
  {
    id: folder4Id,
    name: "💪🏼 Fitness",
    position: 3,
  },
];
