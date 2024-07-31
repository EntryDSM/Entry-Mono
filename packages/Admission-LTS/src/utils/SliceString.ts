export const sliceString = (str: string, arr: number[]) => {
  const result: string[] = [];
  arr.unshift(0);
  for (let i = 0; i < arr.length - 1; i++) {
    arr[i+1] += arr[i];
    result.push(str.slice(arr[i], arr[i + 1]));
  }
  return result;
};
