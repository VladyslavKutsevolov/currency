import { useEffect, useState } from "react";
import { calculateMedian } from "./utils/helpers";
import Chart from "./components/Chart";

const date = new Date();
const now = date.toISOString().split("T")[0];
date.setDate(date.getDate() - 30);
const ago30 = date.toISOString().split("T")[0];

const url = `https://api.frankfurter.app/${ago30}..${now}?amount=100&from=CAD&to=USD`;

function App() {
  const [ratesFor30days, setRates] = useState([]);
  const [avg30, setAvg] = useState(0);
  useEffect(() => {
    const get30DaysCurrencyRate = async () => {
      try {
        const res = await fetch(url);
        const { rates } = await res.json();

        let result = [];
        let data = [];

        for (const key in rates) {
          const rate = {
            date: new Date(key),
            rate: rates[key].USD,
          };

          result = [...result, rates[key].USD];
          data = [...data, rate];
        }

        const median = calculateMedian(result);

        setRates(data);
      } catch (e) {
        console.log("err", e);
      }
    };
    get30DaysCurrencyRate();
  }, []);

  console.log("ratesFor30days", ratesFor30days);
  return (
    <div className="App">
      <h1>hello</h1>
      <Chart data={ratesFor30days} />
    </div>
  );
}

export default App;
