import './css/PhraseCard.css';
export default function PhraseCard({ category, german, korean }) {
  return (
    <div className='phraseCard'>
      <div className='contents'>
        <p className='german'>{german}</p>
        <p className='translation'>{korean}</p>
      </div>
      <div className='category'>{category}</div>
    </div>
  );
}
