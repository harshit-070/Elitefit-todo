export const getLocalstorageItem = (key) => {
  return localStorage.getItem(key);
};

export const setLocalStorageItem = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};
