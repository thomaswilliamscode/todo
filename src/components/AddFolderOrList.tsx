import { useTodoContext } from '../context/TodoContext'
import { useState } from 'react'
import type { FormType } from '../types/formType'
import type { Todo } from '../types/todo'

export default function AddFolderOrList () {
  const { sidebarState, setSidebarState } = useTodoContext()
  const [ formState, setFormState ] = useState<FormType>({
    title: '',
    type: 'list',
  })

  function viewFolders () {
    if (formState.type === 'list') {
      return (
        <div className='view-folders-div'>
          <select
            onChange={(e) =>
              setFormState((s) => ({ ...s, folderId: Number(e.target.value) }))
            }
            name='folder'
            id='folder'
            className='form-select'
          >
            {listFoldersAsOptions()}
          </select>
        </div>
      );
    }
  }

  function listFoldersAsOptions () {
    const folders = sidebarState.data.filter( (array) =>  {
      if ( array.type === 'folder') {
        return array
      }
    })
    folders.unshift({type: 'list', name: 'none', id:0, todos: []})
    const names = folders.map ((folder) => {
      return (
        <option
          value={`${folder.id}`}
          key={`${folder.id}`}
          
        >
          {folder.name}
        </option>
      );
      
      
    })
  return names; 

  }

  function createId (type: string): number {
    if (type === 'list') {
      const allLists = sidebarState.data.filter( (obj) => {
        if (obj.type === 'list') {
          return obj
        }
      })
      const ids = allLists.map ( (list) => {
        return list.id
      })
      const max = Math.max(...ids) 

      const id = max + 1;
      return id
    }
    else if (type === 'folder') {
      const allLists = sidebarState.data.filter((obj) => {
        if (obj.type === 'folder') {
          return obj;
        }
      });
      const ids = allLists.map((folder) => {
        return folder.id;
      });
      const max = Math.max(...ids);

      const id = max + 1;
      return id;
    }
    return 1;
  }

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    type NewListItem = {
      id: number;
      todos: Todo[]; 
      type: 'list';
      name: string;
      folderId?: number
    }
    type NewFolderItem = {
      id: number;
      open: boolean;
      type: 'folder';
      name: string;
      folderId: undefined;
    }

    let newItem: NewListItem | NewFolderItem;
    if (formState.type === 'list') {
      newItem = {
        id: createId('list'),
        todos: [],
        type: 'list',
        name: formState.title,
        folderId: formState.folderId,
      }
      
    }
    if (formState.type === 'folder') {
      newItem = {
        id: createId('folder'),
        open: false,
        type: 'folder',
        name: formState.title,
        folderId: undefined
      }
      newItem.id = createId('folder');
      newItem.open = false;
      newItem.type = formState.type;
      newItem.name = formState.title;
      newItem.folderId = undefined;
    }
    


    setSidebarState( prev => ({
      ...prev, 
      data: [
        ...prev.data, newItem
      ]
  }))
  setFormState({
    title: '',
    type: 'list',
  });
  }
  return (
    <>
      <form onSubmit={submit}>
        <div className='full-form-div'>
          <div className='form-main-div'>
            <input
              type='text'
              name='name'
              value={formState.title}
              onChange={(e) =>
                setFormState({ ...formState, title: e.target.value })
              }
              placeholder='Title'
            />
            <div>
              <input
                type='radio'
                value='list'
                id='list'
                name='type'
                checked={formState.type === 'list'}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    type: e.target.value as FormType['type'],
                  })
                }
              />
              <label htmlFor='list'>List</label>
              <input
                type='radio'
                value='folder'
                id='folder'
                name='type'
                checked={formState.type === 'folder'}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    type: e.target.value as FormType['type'],
                  })
                }
              />

              <label htmlFor='folder'>Folder</label>
            </div>
          </div>
          <span id='drop-down'>
            {viewFolders()}
          </span>
          <button
            className='form-submit'
            type='submit'
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
}