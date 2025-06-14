import {
  fetchFunctionHouse,
  getStarredIds,
} from '../scripts/contents/fetch_data.js';
import './css/Main.css';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router';
import PhraseCard from './PhraseCard.jsx';
import { useCategoryContext } from '../context/CategoryProvider.jsx';

export default function PhraseCardList() {
  const [data, setData] = useState({});
  const timeoutRef = useRef(null); // data loader timer
  const scrollTimeoutRef = useRef(null); // scroll debounce timer
  const location = useLocation();
  const starredIds = getStarredIds();
  const selectedCategory = useCategoryContext();

  useEffect(() => {
    function clearEnvironment() {
      setData({}); // clear previous contents
      clearTimeout(timeoutRef.current); // clear data loading by dataHandler
      clearTimeout(scrollTimeoutRef.current); // clear data loading by debounceHandler
    }

    const loadedData =
      fetchFunctionHouse?.[location.pathname](selectedCategory);
    function loadData() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        if (!loadedData) {
          return null; // there is no function key matched with [location.pathname]
        }

        let data = loadedData.next();
        if (data.done) {
          return null; // nothing to load more
        }

        setData((prevData) => {
          let freshData = { ...prevData };
          Object.entries(data.value).forEach(([category, contents]) => {
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
      }
      return true;
    }

    function dataHandler() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        const completed = loadData();
        if (!completed) {
          return; // failed to load data
        }

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(dataHandler, 200);
      }
    }

    function debounceHandler() {
      clearTimeout(scrollTimeoutRef.current);
      scrollTimeoutRef.current = setTimeout(dataHandler, 200);
    }

    clearEnvironment();
    setTimeout(dataHandler, 200); // clearEnvrionment needs time to re-render to empty the page.

    window.addEventListener('scroll', debounceHandler);
    window.addEventListener('resize', debounceHandler);
    return () => {
      window.removeEventListener('scroll', debounceHandler);
      window.removeEventListener('resize', debounceHandler);
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
    </>
  );
}
