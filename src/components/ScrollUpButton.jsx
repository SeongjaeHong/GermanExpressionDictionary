import { faCircleArrowUp } from '@fortawesome/free-solid-svg-icons/faCircleArrowUp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/ScrollUpButton.css';

export default function ScrollUpButton() {
  function scrollUpHandler() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <button onClick={scrollUpHandler}>
      <FontAwesomeIcon id='arrow-up' icon={faCircleArrowUp} />
    </button>
  );
}
