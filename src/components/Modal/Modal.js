import React, { useRef } from "react";
import Chart from "../Chart";
import "./styles.css";
import Diff from "../Diff";
import BuySell from "../BuySell";

const Modal = ({
  showModal,
  toggleModal,
  data,
  currentRate,
  previousRate,
  medianRate,
}) => {
  const ref = useRef();

  const closeModal = (e) => {
    if (ref.current === e.target) {
      toggleModal((prev) => !prev);
    }
  };
  return (
    <>
      {showModal ? (
        <div ref={ref} onClick={closeModal} className="modal">
          <div className="modal-inner">
            <span onClick={toggleModal} className="modal-close">
              <i className="fas fa-times"></i>
            </span>
            <div className="modal-graph">
              <Chart />
            </div>
            <div className="modal-text">
              <h3>
                This graph displays exchange rate for CAD/USD for the last 30
                days
              </h3>
              <div>
                <p>Last update: 100 CAD = {currentRate} USD</p>
              </div>
              <div>
                <Diff
                  data={data}
                  current={currentRate}
                  previous={previousRate}
                />
              </div>
              <p>Based on received data we suggest you to</p>
              <BuySell medianRate={medianRate} currentRate={currentRate} />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
