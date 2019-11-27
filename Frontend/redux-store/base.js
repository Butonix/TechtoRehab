import { action } from 'easy-peasy';

export const baseStore = {
   sidebar: false,
   setSidebar:  action((state,payload) => state.sidebar = payload)
}