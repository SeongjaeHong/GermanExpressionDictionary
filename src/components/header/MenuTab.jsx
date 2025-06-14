import { useCategorySetterContext } from '../../context/CategoryProvider';
import { getCategories } from '../../scripts/contents/fetch_data';
import { CATEGORY_ALL, ROUTES } from '../../assets/constants';
import { Link } from 'react-router';
import './css/MenuTab.css';

export default function MenuTab() {
  const categorySetter = useCategorySetterContext();
  const starredLinkHandler = () => {
    categorySetter(CATEGORY_ALL);
    document.querySelector('#category-list').selectedIndex = 0;
  };
  return (
    <>
      <h1 id='starredLink'>
        <Link to={ROUTES.starred} onClick={starredLinkHandler}>
          즐겨찾기
        </Link>
      </h1>
      <select
        id='category-list'
        onChange={(e) => {
          categorySetter(e.target.value);
        }}
      >
        {getCategories().map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </>
  );
}
