import PhraseCard from './PhraseCard.jsx';
import { fetchPartData } from '../scripts/csvConvertor.js';
import './css/Main.css';
import { useEffect, useRef, useState } from 'react';

export default function Main() {
  const [data, setData] = useState({});
  const dataRef = useRef(0);
  const loadingRef = useRef(false);
  const timeoutRef = useRef(null); // debounce 타이머 저장

  const dataHandler = async () => {
    if (loadingRef.current) return;

    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      loadingRef.current = true;

      let loadedData = await fetchPartData(dataRef.current++);
      if (!loadedData) {
        return;
      }

      setData((prevData) => {
        let freshData = { ...prevData };
        Object.entries(loadedData).forEach(([category, contents]) => {
          if (!freshData[category]) {
            freshData[category] = [];
          }
          const existingIds = new Set(
            freshData[category].map((item) => item.id)
          );
          const newContents = contents.filter(
            (item) => !existingIds.has(item.id)
          );
          freshData[category].push(...newContents);
        });
        return freshData;
      });
      loadingRef.current = false;
    }
  };

  const debounceHandler = () => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(dataHandler, 200); // 200ms debounce
  };

  useEffect(() => {
    dataHandler();

    window.addEventListener('scroll', debounceHandler);
    return () => {
      window.removeEventListener('scroll', debounceHandler);
      clearTimeout(timeoutRef.current); // 컴포넌트 언마운트 시 클리어
    };
  }, [data]);

  return (
    <main>
      {Object.entries(data).map(([category, exps]) =>
        exps.map(({ id, German, Korean }) => (
          <PhraseCard
            key={id}
            category={category}
            german={German}
            korean={Korean}
          ></PhraseCard>
        ))
      )}
    </main>
  );
}
