import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faStar as coloredFaStar } from '@fortawesome/free-solid-svg-icons';
import './css/PhraseCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
export default function PhraseCard({ category, german, korean }) {
  const [starred, setStar] = useState(false);
  const starHandler = () => setStar(!starred);
  return (
    <div className='phraseCard'>
      <div className='contents'>
        <p className='german'>{german}</p>
        <p className='translation'>{korean}</p>
      </div>
      <div className='rightPannel'>
        <div className='category'>{category}</div>
        <div className='star' onClick={starHandler}>
          <FontAwesomeIcon icon={starred ? coloredFaStar : faStar} />
        </div>
      </div>
    </div>
  );
}
