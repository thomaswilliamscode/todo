import type { Folder } from './folder'
import type { List } from './list'
import type { Inbox } from './inbox'


export interface StateData {
  data: ( Folder | List | Inbox )[]
}