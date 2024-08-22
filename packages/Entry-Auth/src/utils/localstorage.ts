type LocalStorageKeys = 'isVerified';

export const setLocalStorage = (key: LocalStorageKeys, value: string) => {
  localStorage.setItem(key, value);
};

export const getLocalStorage = (key: LocalStorageKeys) =>
  localStorage.getItem(key);

export const removeLocalStorageItem = (key: LocalStorageKeys) =>
  localStorage.removeItem(key);
