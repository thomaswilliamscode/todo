

export const data = [
  {
    type: 'folder',
    id: 1,
    name: '🔥 Daily Rituals',
    open: true,
  },
  {
    type: 'folder',
    id: 2,
    name: '📦 Content',
    open: true,
  },
  {
    type: 'list',
    id: 1,
    name: 'Today!!!',
    folderId: 1,
    todos: [{ id: 1, title: 'test', completed: false }],
  },
  {
    type: 'list',
    id: 2,
    name: 'Focus Tasks',
    folderId: 1,
    todos: [{ id: 2, title: 'shower', completed: false }],
  },
  {
    type: 'list',
    id: 3,
    name: 'Video Ideas',
    folderId: 2,
    todos: [{ id: 3, title: 'walk dogs', completed: false }],
  },
  {
    type: 'list',
    id: 4,
    name: 'Clips to Post',
    folderId: 2,
    todos: [{ id: 4, title: 'rant', completed: false }],
  },
];