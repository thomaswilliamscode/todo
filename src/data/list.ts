import type { List } from '../types/list'
import { dummyData } from './todos'

export const listData: List[] = [
  { type: 'list', id: 1, name: 'Today', todos: dummyData},
  { type: 'list', id: 2, name: 'Focus Tasks', todos: dummyData },
];
