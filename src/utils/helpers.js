export const calculateMedian = (ratesArr) => {
  const rates = [...ratesArr];
  if (!rates.length) return 0;

  rates.sort((a, b) => a - b);

  const middle = Math.floor(rates.length / 2);

  if (middle % 2) {
    return rates[middle];
  }

  return (rates[middle - 1] + rates[middle]) / 2;
};

export const getPercentageDiff = (newNum, oldNum) => {
  if (newNum && oldNum) {
    return (100 * ((newNum - oldNum) / ((newNum + oldNum) / 2))).toFixed(2);
  }
};
