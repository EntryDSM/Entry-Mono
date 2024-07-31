export const generateNumberArray = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }, (_, index) => {
    const number = start + index;
    const paddedNumber = number.toString().padStart(2, '0');
    return paddedNumber;
  });
};
