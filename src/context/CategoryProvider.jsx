import { createContext, useContext, useState } from 'react';

const CategoryContext = createContext(null);
const CategorySetterContext = createContext(null);

export default function CategoryProvider({ children }) {
  const [category, setCategory] = useState('카테고리');
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
