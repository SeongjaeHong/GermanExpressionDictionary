import { createContext, useContext, useState } from 'react';
import { CATEGORY_ALL } from '../assets/constants';

const CategoryContext = createContext(null);
const CategorySetterContext = createContext(null);

export default function CategoryProvider({ children }) {
  const [category, setCategory] = useState(CATEGORY_ALL);
  return (
    <CategoryContext.Provider value={category}>
      <CategorySetterContext value={setCategory}>
        {children}
      </CategorySetterContext>
    </CategoryContext.Provider>
  );
}

export function useCategoryContext() {
  return useContext(CategoryContext);
}

export function useCategorySetterContext() {
  return useContext(CategorySetterContext);
}
