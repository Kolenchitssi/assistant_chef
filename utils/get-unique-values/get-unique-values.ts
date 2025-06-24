export function getUniqueValuesFromArr<
  T extends string | number | boolean,
>(values: T[]): T[] {
  const uniqueValues = Array.from(new Set(values));
  return uniqueValues;
}

export function getUniqueValuesFromArrOfObj<T, K extends keyof T>(
  objects: Array<T>,
  key: K,
): T[K][] {
  const values = objects.map((obj) => obj[key]);
  const uniqueValues = Array.from(new Set(values));
  return uniqueValues;
}
