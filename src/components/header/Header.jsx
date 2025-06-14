import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import './css/Header.css';
import MenubarButton from './mobile/MenubarButton';
import { ROUTES } from '../../assets/constants';
import MenuTab from './MenuTab';

export default function Header() {
  const [mobileScreen, setMobileScreen] = useState(false);

  useEffect(() => {
    function resizeHandler() {
      if (window.innerWidth < 450) {
        setMobileScreen(true);
      } else {
        setMobileScreen(false);
      }
    }

    window.addEventListener('resize', resizeHandler);
    return () => {
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  return (
    <header>
      <h1 id='title'>
        <Link to={ROUTES.home}>독일 생활 표현 사전</Link>
      </h1>
      <div className='menu'>
        {mobileScreen && <MenubarButton />}
        {!mobileScreen && <MenuTab />}
      </div>
    </header>
  );
}

function menuHandler() {
  alert('Will be updated');
  /*
  한 화면에 검은색 반투명 패널 깔고,
  메뉴 보이게 하기
  1. 즐겨찾기
  2. 카테고리
   */
}
