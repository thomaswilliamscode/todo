import { useTodoContext } from '../context/TodoContext'

export default function useSidebarHooks () {
  const { sidebarState } = useTodoContext()

  function findOpenFolders () {
    return sidebarState.data.filter( item => item.type === 'folder' && item.open)
  }

  return {
    findOpenFolders,
    


  }
}

