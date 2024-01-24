export const LOCAL_STORAGE_KEYS = {
  RECENT_SEARCHES: "recent-searches",
};

const setItem = <T>(key: string, value: T) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getItem = <T>(key: string): T | null => {
  try {
    const storedItem = localStorage.getItem(key);
    return storedItem ? JSON.parse(storedItem) : null;
  } catch (e) {
    console.warn("Attempting to parse invalid JSON");
    return null;
  }
};

export const localStorageHelper = {
  setItem,
  getItem,
};
