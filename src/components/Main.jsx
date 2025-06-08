import PhraseCard from './PhraseCard.jsx';
import { fetchPartData } from '../scripts/csvConvertor.js';
import './css/Main.css';
import { useEffect, useRef, useState } from 'react';

export default function Main() {
  const [data, setData] = useState({});
  const dataRef = useRef(0);
  const timeoutRef = useRef(null); // debounce 타이머 저장

  const dataHandler = async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
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
          freshData[category].push(...contents);
        });
        return freshData;
      });
    }
  };

  useEffect(() => {
    async function loadData() {
      await dataHandler();

      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        setTimeout(loadData, 200);
      }
    }
    loadData();

    const debounceHandler = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(dataHandler, 200); // 200ms debounce
    };

    window.addEventListener('scroll', debounceHandler);
    return () => {
      window.removeEventListener('scroll', debounceHandler);
      clearTimeout(timeoutRef.current); // 컴포넌트 언마운트 시 클리어
    };
  }, []);

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
