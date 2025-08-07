import type { Folder } from './folder'
import type { List } from './list'


export interface StateData {
  data: ( Folder | List )[]
}