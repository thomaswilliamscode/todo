import type { StateData } from '../types/state-data';
import { dummyData } from './todos';

export const stateData: StateData = {
  data: [
    {
      type: 'list',
      id: 1,
      name: 'Today',
      todos: dummyData,
      folderId: 1,
    },
    {
      type: 'list',
      id: 2,
      name: 'Focus Tasks',
      todos: dummyData,
      folderId: 1,
    },
    {
      type: 'folder',
      id: 1,
      name: '🔥 Daily Rituals',
      open: true,
    },
    {
      type: 'list',
      id: 3,
      name: '💡 Standalone',
      todos: dummyData,
      // no folderId — it lives outside folders
    },
  ],
};
