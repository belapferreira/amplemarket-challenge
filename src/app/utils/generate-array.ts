export const generateArray = (length: number) => {
  const generatedArray = Array.from({ length }, (_, index) => index + 1);

  return generatedArray;
};
