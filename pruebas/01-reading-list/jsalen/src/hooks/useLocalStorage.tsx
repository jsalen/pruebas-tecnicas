import { useEffect, useState } from 'react';

export const useLocalStorage = (
  key: string,
  initialValue?: string[]
): {
  storedValues: string[];
  addValue: (value: string) => void;
  removeValue: (value: string) => void;
} => {
  const [storedValues, setStoredValues] = useState<string[]>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const addValue = (value: string) => {
    if (storedValues.includes(value)) {
      return;
    }

    const updatedValues = [...storedValues, value];

    setStoredValues(updatedValues);

    try {
      window.localStorage.setItem(key, JSON.stringify(updatedValues));
    } catch (error) {
      console.log(error);
    }
  };

  const removeValue = (value: string) => {
    const item = window.localStorage.getItem(key);
    const filteredItems = item
      ? JSON.parse(item).filter((item: string) => item !== value)
      : [];

    setStoredValues(filteredItems);

    try {
      window.localStorage.setItem(key, JSON.stringify(filteredItems));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStorageChange = () => {
    const item = window.localStorage.getItem(key);

    if (item) {
      setStoredValues(JSON.parse(item));
    }
  };

  useEffect(() => {
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return { storedValues, addValue, removeValue };
};
