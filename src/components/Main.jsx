import { useEffect, useState } from 'react';
import PhraseCardList from './PhraseCardList';
import './css/PhraseCardList.css';
import ScrollUpButton from './ScrollUpButton';

export default function Main() {
  const [scrollDown, SetscrollDown] = useState(false);

  useEffect(() => {
    function scrollDownHandler() {
      if (window.scrollY > 100) {
        SetscrollDown(true);
      } else {
        SetscrollDown(false);
      }
    }

    window.addEventListener('scroll', scrollDownHandler);
    return () => {
      window.removeEventListener('scroll', scrollDownHandler);
    };
  }, []);

  return (
    <main>
      <div className='card-list'>
        <PhraseCardList />
      </div>
      {scrollDown && <ScrollUpButton />}
    </main>
  );
}
