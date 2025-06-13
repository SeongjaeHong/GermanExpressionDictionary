import { Link } from 'react-router';
import './css/Header.css';
import { ROUTES } from '../assets/constants';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { getCategories } from '../scripts/contents/fetch_data';
import { useCategorySetterContext } from '../context/CategoryProvider';

export default function Header() {
  const [mobileScreen, setMobileScreen] = useState(false);
  const categorySetter = useCategorySetterContext();

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
        {mobileScreen && (
          <button id='menubar' onClick={menuHandler}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        )}
        {!mobileScreen && (
          <>
            <h1 id='starred'>
              <Link to={ROUTES.starred}>즐겨찾기</Link>
            </h1>
            <select
              id='category-list'
              onChange={(e) => {
                categorySetter(e.target.value);
              }}
            >
              {getCategories().map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </>
        )}
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
