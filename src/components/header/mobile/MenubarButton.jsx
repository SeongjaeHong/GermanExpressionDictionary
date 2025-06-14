import { useState } from 'react';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './css/MenubarButton.css';

export default function MenubarButton() {
  const [menuPanel, setMenuPanel] = useState(false);
  return (
    <button id='menubar' onClick={() => setMenuPanel(!menuPanel)}>
      <FontAwesomeIcon icon={faBars} />
    </button>
  );
}
