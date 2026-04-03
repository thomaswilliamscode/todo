import type { StateData } from "../types/state-data";


import { folder1Id, folder2Id, folder3Id, folder4Id } from "./helpers/id-info";

export const stateData: StateData[] = [
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
