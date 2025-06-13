import { CATEGORY_ALL, ROUTES, STARRED } from '../../assets/constants';

const text = await fetch('/data/sample.csv')
  .then((res) => res.text())
  .catch((err) => console.error(err));
const lines = text
  .split('\r\n')
  .filter((line) => line !== '')
  .slice(1); // first low is a column

const categories = [CATEGORY_ALL];
for (const line of lines) {
  const category = line.split(',')[1];
  if (!categories.includes(category)) {
    categories.push(category);
  }
}
export function getCategories() {
  return categories;
}

export const fetchFunctionHouse = {
  [ROUTES.home]: fetchPartData,
  [ROUTES.starred]: fetchStarredData,
};

export function* fetchPartData(category = CATEGORY_ALL, ids = null) {
  let fetchedLines = [];
  if (ids instanceof Array) {
    fetchedLines = ids.map((id) => lines[id - 1]);
  } else {
    fetchedLines = lines;
  }

  const yiled_unit = 10;
  let data = {};
  let current_idx = 0;
  let yiled_unit_cnt = 0;
  while (current_idx < fetchedLines.length) {
    const tokens = fetchedLines[current_idx++].split(',');
    if (category !== CATEGORY_ALL && tokens[1] !== category) {
      continue;
    }

    if (!(tokens[1] in data)) {
      data[tokens[1]] = [];
    }

    data[tokens[1]].push({
      id: tokens[0],
      German: tokens[2],
      Korean: tokens[3],
    });

    if (++yiled_unit_cnt === yiled_unit) {
      yield data;
      data = {};
      yiled_unit_cnt = 0;
    }
  }

  if (Object.keys(data).length) {
    yield data;
  }
}

export function fetchStarredData(category = CATEGORY_ALL) {
  const starredIds = JSON.parse(localStorage.getItem(STARRED));
  if (starredIds instanceof Array && !starredIds.length) return null;
  else if (!starredIds) return null;

  return fetchPartData(category, starredIds);
}

export function getStarredIds() {
  let starredIds = JSON.parse(localStorage.getItem(STARRED));
  if (!starredIds) {
    starredIds = [];
  }

  return starredIds;
}
