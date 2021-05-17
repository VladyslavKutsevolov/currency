import { useMemo, useState } from "react";
import { calculateMedian } from "./utils/helpers";

import useData from "./components/hooks/useData";
import Intro from "./components/Intro/Intro";
import Modal from "./components/Modal/Modal";

function App() {
  const data = useData();
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const medianRate = useMemo(() => {
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
      <Intro showModal={showModal} toggleModal={toggleModal} />
      <Modal
        showModal={showModal}
        toggleModal={toggleModal}
        data={data}
        currentRate={currentRate}
        medianRate={medianRate}
        previousRate={previousRate}
      />
    </div>
  );
}

export default App;
