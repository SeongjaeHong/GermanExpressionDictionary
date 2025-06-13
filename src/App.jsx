import { Outlet } from 'react-router';
import Header from './components/Header.jsx';

export default function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}
