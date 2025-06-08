import { Link } from 'react-router';
import './css/Header.css';
import { ROUTES } from '../assets/constants';

export default function Header() {
  return (
    <header className='flex justify-between items-center mb-4'>
      <h1 className='title'>
        <Link to={ROUTES.home}>독일 생활 표현 사전</Link>
      </h1>
      <div>
        <Link to={ROUTES.starred}>즐겨찾기</Link>
      </div>
    </header>
  );
}
