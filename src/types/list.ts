import type {Todo} from './todo'

export interface List {
  type: 'list';
  id: number; 
  name: string; 
  folderId?: number;
  todos: Todo[];
}
