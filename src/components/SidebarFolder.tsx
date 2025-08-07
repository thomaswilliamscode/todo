import type { Folder } from '../types/folders'

type Props = {
  folder: Folder;
}

export default function SidebarFolder ( {folder}: Props) {
  return (
    <div>
      <p>{folder.name}</p>
    </div>
  )
}