import { Link } from 'react-router';
import { useCategorySetterContext } from '../../context/CategoryProvider';
import { getCategories } from '../../scripts/contents/fetch_data';
import { ROUTES } from '../../assets/constants';
import { useInitCategorySelection } from './Header';
import './css/MenuTab.css';

export default function MenuTab() {
  const categorySetter = useCategorySetterContext();
  const starredLinkHandler = useInitCategorySelection();
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
