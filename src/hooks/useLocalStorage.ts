import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, defaultValue: T): [T, (value: T) => void] {
  // Initialize state with value from localStorage or default
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return defaultValue;
    }
  });

  // Update localStorage when state changes
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}

// Specialized hook for API key with validation
export function useApiKey(): [string, (key: string) => void, () => void] {
  const [apiKey, setApiKey] = useLocalStorage('cv_api_key', '');

  const updateApiKey = (key: string) => {
    setApiKey(key);
  };

  const clearApiKey = () => {
    setApiKey('');
  };

  return [apiKey, updateApiKey, clearApiKey];
}