import type { Todo } from './todo';

export interface Inbox {
  type: 'inbox';
  id: 0;
  todos: Todo[];
}
