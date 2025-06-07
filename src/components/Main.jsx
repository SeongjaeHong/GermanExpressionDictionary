import PhraseCard from './PhraseCard.jsx';
import { fetchData } from '../scripts/csvConvertor.js';
import './css/Main.css';

let data = await fetchData('data/sample.csv');

export default function Main() {
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
