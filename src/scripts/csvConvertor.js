export async function fetchData(csv_path) {
  const text = await fetch(csv_path)
    .then((res) => res.text())
    .catch((err) => console.error(err));

  const data = {};
  const lines = text.split('\r\n');
  for (const line of lines.splice(1)) {
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
