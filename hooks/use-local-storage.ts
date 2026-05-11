'use client';

import { useEffect, useRef, useState } from 'react';

type SetValue<T> = (value: T | ((prev: T) => T)) => void;

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const initialRef = useRef(initialValue);
  const [storedValue, setStoredValue] = useState<T>(initialRef.current);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const item = window.localStorage.getItem(key);
      if (item !== null) {
        setStoredValue(JSON.parse(item) as T);
      }
    } catch {
      setStoredValue(initialRef.current);
    }
  }, [key]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      // Ignore write errors (e.g., storage full).
    }
  }, [key, storedValue]);

  const setValue: SetValue<T> = (value) => {
    setStoredValue((prev) => (typeof value === 'function' ? (value as (prev: T) => T)(prev) : value));
  };

  return [storedValue, setValue];
}
