const text = await fetch('data/sample.csv')
  .then((res) => res.text())
  .catch((err) => console.error(err));
const lines = text.split('\r\n');

export async function fetchData() {
  const data = {};
  for (const line of lines.slice(1)) {
    if (!line) continue;
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

export async function fetchPartData(index = 0) {
  const data = {};
  const unit = 5;
  const start = index * unit + 1;
  const end = start + unit > lines.length ? lines.length : start + unit;
  if (start >= end) {
    return null;
  }
  for (const line of lines.slice(start, end)) {
    if (!line) continue;
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
