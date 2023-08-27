import { MMKV } from 'react-native-mmkv';
import { Storage } from 'redux-persist';

export const appStorage = new MMKV({ id: 'app-storage' });

const storage = new MMKV({ id: 'persisted-app-storage' });

export const reduxStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
