import { ROUTES, STARRED } from '../../assets/constants';

const text = await fetch('/data/sample.csv')
  .then((res) => res.text())
  .catch((err) => console.error(err));
const lines = text
  .split('\r\n')
  .filter((line) => line !== '')
  .slice(1); // first low is a column

export const fetchFunctionHouse = {
  [ROUTES.home]: fetchPartData,
  [ROUTES.starred]: fetchStarredData,
};

export function fetchPartData(index = 0, ids = null) {
  const data = {};

  let fetchedLines = [];
  if (ids instanceof Array) {
    fetchedLines = ids.map((id) => lines[id - 1]);
  } else {
    fetchedLines = lines;
  }

  const unit = 10;
  const start = index * unit;
  const end =
    start + unit > fetchedLines.length ? fetchedLines.length : start + unit;
  if (start >= end) {
    return null;
  }

  for (const line of fetchedLines.slice(start, end)) {
    const tokens = line.split(',');
    if (!(tokens[1] in data)) {
      data[tokens[1]] = [];
    }
    data[tokens[1]].push({
      id: tokens[0],
      German: tokens[2],
      Korean: tokens[3],
    });
  }

  return data;
}

export function fetchStarredData(index = 0) {
  const starredIds = JSON.parse(localStorage.getItem(STARRED));
  if (starredIds instanceof Array && !starredIds.length) return null;
  else if (!starredIds) return null;

  return fetchPartData(index, starredIds);
}

export function getStarredIds() {
  let starredIds = JSON.parse(localStorage.getItem(STARRED));
  if (!starredIds) {
    starredIds = [];
  }

  return starredIds;
}
