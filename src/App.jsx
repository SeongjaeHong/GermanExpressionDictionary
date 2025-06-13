import { Outlet } from 'react-router';
import Header from './components/Header.jsx';
import CategoryProvider from './context/CategoryProvider.jsx';

export default function App() {
  return (
    <>
      <CategoryProvider>
        <Header />
        <Outlet />
      </CategoryProvider>
    </>
  );
}
