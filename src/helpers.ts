export function getPosition(length: number) {
  const start = ~~(Math.random() * (length - 13));
  const end = start + 14;
  return { start, end };
}

interface Array {
  id: number;
  name: string;
  image: string;
}

export function shuffleArrays(
  arr1: Array[],
  arr2: Array[],
  start: number,
  end: number
) {
  let array = [...arr1.slice(start, end), ...arr2.slice(start, end)];
  for (let i = array.length - 1; i > 0; i--) {
    const j = ~~(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
