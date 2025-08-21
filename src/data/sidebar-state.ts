import type { StateData } from '../types/state-data';
import { dummyData1, dummyData2, dummyData3 } from './todos';

export const stateData: StateData = {
  data: [
    {
      type: 'list',
      id: 1,
      name: 'Today',
      todos: dummyData1,
      folderId: 1,
    },
    {
      type: 'list',
      id: 2,
      name: 'Focus Tasks',
      todos: dummyData2,
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
      todos: dummyData3,
      // no folderId — it lives outside folders
    },
    {
      type: 'folder',
      id: 2,
      name: 'Programming',
      open: false,
    },
    {
      type: 'list',
      id: 4,
      name: 'Focus Tasks',
      todos: dummyData2,
      folderId: 2,
    },
    
  ],
};
