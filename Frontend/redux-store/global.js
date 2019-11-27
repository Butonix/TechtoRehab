import { baseStore } from './base';
import { action } from 'easy-peasy';


export const globalStore = {
    title: 'Hello',
    windowSize: 0,
    setWindowSize: action((state,payload) => state.windowSize = payload),
    base: baseStore
}