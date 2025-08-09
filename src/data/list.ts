import type { List } from '../types/list'
import { dummyData1, dummyData2 } from './todos'

export const listData: List[] = [
  { type: 'list', id: 1, name: 'Today', todos: dummyData1},
  { type: 'list', id: 2, name: 'Focus Tasks', todos: dummyData2 },
];
