import { baseStore } from './base';
import { action } from 'easy-peasy';


export const globalStore = {
  sidebar: false,
  setSidebar: action((state,payload) => state.sidebar = payload)
}