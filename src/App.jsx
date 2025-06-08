import { Outlet } from 'react-router';
import Header from './components/Header.jsx';
import Main from './components/Main.jsx';

export default function App() {
  return (
    <>
      <div className='p-4'>
        <Header />
        <Outlet />
      </div>
    </>
  );
}
