import { useMemo } from "react";
import { calculateMedian } from "./utils/helpers";

import Chart from "./components/Chart/index";
import useData from "./components/hooks/useData";
import Diff from "./components/Diff";
import BuySell from "./components/BuySell";

function App() {
  const data = useData();

  const medain = useMemo(() => {
    const ratesArr = data.length ? data.map((d) => d.rate) : [];
    return calculateMedian(ratesArr);
  }, [data]);

  if (!data.length) {
    return <pre>Loading...</pre>;
  }

  const currentRate = data.length
    ? data.map((d) => d.rate)[data.length - 1]
    : 0;
  const previousRate = data.length
    ? data.map((d) => d.rate)[data.length - 2]
    : 0;

  return (
    <div className="App">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Chart />
        <Diff data={data} current={currentRate} previous={previousRate} />
        <BuySell current={currentRate} median={medain} />
      </div>
    </div>
  );
}

export default App;
