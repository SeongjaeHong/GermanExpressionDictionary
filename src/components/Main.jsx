import PhraseCard from './PhraseCard.jsx';
import { fetchData, fetchPartData } from '../scripts/csvConvertor.js';
import './css/Main.css';
import { useEffect, useRef, useState } from 'react';

export default function Main() {
  const [data, setData] = useState({});
  const dataRef = useRef(0);
  const dataHandler = async () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      let loadedData = await fetchPartData(dataRef.current);
      if (!loadedData) {
        return;
      }

      let freshData = Object.assign({}, data);
      Object.entries(loadedData).forEach(([category, contents]) => {
        if (!freshData[category]) {
          freshData[category] = [];
        }
        freshData[category].push(...contents);
      });
      setData(freshData);
      dataRef.current += 1;
    }
  };

  useEffect(() => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      dataHandler();
    }

    window.addEventListener('scroll', dataHandler);
    console.log(window.innerHeight, window.scrollY, document.body.offsetHeight);
    return () => {
      window.removeEventListener('scroll', dataHandler);
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
