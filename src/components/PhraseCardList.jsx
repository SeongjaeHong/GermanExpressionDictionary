import {
  fetchFunctionHouse,
  getStarredIds,
} from '../scripts/contents/fetch_data.js';
import './css/Main.css';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import PhraseCard from './PhraseCard.jsx';
import { useCategoryContext } from '../context/CategoryProvider.jsx';
import { ROUTES } from '../assets/constants.js';

export default function PhraseCardList() {
  const [data, setData] = useState({});
  const timeoutRef = useRef(null); // data loader timer
  const location = useLocation();
  const starredIds = getStarredIds();
  const selectedCategory = useCategoryContext();

  useEffect(() => {
    const loadedData =
      fetchFunctionHouse?.[location.pathname](selectedCategory);

    function clearEnvironment() {
      setData({}); // clear previous contents
      clearTimeout(timeoutRef.current); // clear data loading by dataHandler
    }

    function loadData() {
      let nextData = loadedData.next();
      if (nextData.done) {
        return { done: true };
      }

      setData((prevData) => {
        let freshData = { ...prevData };
        Object.entries(nextData.value).forEach(([category, contents]) => {
          if (!freshData[category]) {
            freshData[category] = [];
          }
          const registeredIds = freshData[category].map((item) => item.id);
          freshData[category].push(
            ...contents.filter((item) => !registeredIds.includes(item.id))
          );
        });
        return freshData;
      });

      return { done: false };
    }

    function dataHandler() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const { done } = loadData();
        if (done) {
          return; // no data to load anymore
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(dataHandler, 200);
      }
    }

    if (loadedData) {
      clearEnvironment();
      timeoutRef.current = setTimeout(dataHandler, 200); // clearEnvrionment needs to re-render to empty the page before loading data.
    }

    window.addEventListener('scroll', dataHandler);
    window.addEventListener('resize', dataHandler);
    return () => {
      window.removeEventListener('scroll', dataHandler);
      window.removeEventListener('resize', dataHandler);
      clearTimeout(timeoutRef.current);
    };
  }, [location.pathname, selectedCategory]);

  return (
    <>
      {Object.entries(data).map(([category, contents]) =>
        contents.map(({ id, German, Korean }) => (
          <PhraseCard
            key={id}
            id={id}
            category={category}
            german={German}
            korean={Korean}
            isStarred={starredIds.includes(id)}
          ></PhraseCard>
        ))
      )}
      {!Object.keys(data).length && (
        <div id='empty-message'>
          {location.pathname === ROUTES.starred
            ? '독일어 표현을 즐겨찾기 해주세요!'
            : '표시할 독일어 표현이 없습니다.'}
        </div>
      )}
    </>
  );
}
