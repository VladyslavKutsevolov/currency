import { useEffect, useState } from "react";

const date = new Date();
const now = date.toISOString().split("T")[0];
date.setDate(date.getDate() - 30);
const ago30 = date.toISOString().split("T")[0];

const url = `https://api.frankfurter.app/${ago30}..${now}?amount=100&from=CAD&to=USD`;
console.log("url", url);

const calculateMedian = (ratesArr) => {
  const rates = [...ratesArr];
  if (!rates.length) return 0;

  rates.sort((a, b) => a - b);

  const middle = Math.floor(rates.length / 2);

  if (middle % 2) {
    return rates[middle];
  }

  return (rates[middle - 1] + rates[middle]) / 2;
};

function App() {
  const [ratesFor30days, setRates] = useState([]);
  const [avg30, setAvg] = useState(0);
  useEffect(() => {
    const get30DaysCurrencyRate = async () => {
      try {
        const res = await fetch(url);
        const { rates } = await res.json();
        console.log("rates", rates);
        let result = [];
        for (const key in rates) {
          result = [...result, rates[key].USD];
        }
        const median = calculateMedian(result);
        setRates(result);
        console.log("median", median);
      } catch (e) {
        console.log("err", e);
      }
    };
    get30DaysCurrencyRate();
  }, []);

  console.log("ratesFor30days", ratesFor30days.length);
  return (
    <div className="App">
      <h1>hello</h1>
    </div>
  );
}

export default App;
