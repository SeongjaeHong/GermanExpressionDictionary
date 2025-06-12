import { faStar } from '@fortawesome/free-regular-svg-icons';
import {
  faStar as coloredFaStar,
  faHeadphones,
} from '@fortawesome/free-solid-svg-icons';
import './css/PhraseCard.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { STARRED } from '../assets/constants';

export default function PhraseCard({
  id,
  category,
  german,
  korean,
  isStarred = false,
}) {
  const [starred, setStar] = useState(isStarred);
  const starHandler = () => {
    if (starred) {
      const starredIds = JSON.parse(localStorage.getItem(STARRED));
      if (!starredIds) {
        return;
      }

      const newStarredIds = starredIds.filter((item) => item != id);
      localStorage.setItem(
        STARRED,
        JSON.stringify(newStarredIds) // remove not starred id
      );
    } else {
      let starredIds = JSON.parse(localStorage.getItem(STARRED));
      if (!starredIds) {
        starredIds = [];
      }
      starredIds.push(id);
      localStorage.setItem(STARRED, JSON.stringify(starredIds)); // add starred id
    }
    setStar(!starred);
  };

  return (
    <div className='phraseCard'>
      <div className='contents'>
        <p className='german'>
          {german}
          <button onClick={() => utteranceHandler(german)}>
            &nbsp;
            <FontAwesomeIcon icon={faHeadphones} />
          </button>
        </p>
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

function utteranceHandler(sentence) {
  const utterance = new SpeechSynthesisUtterance(sentence);
  utterance.lang = 'de';
  speechSynthesis.speak(utterance);
}
