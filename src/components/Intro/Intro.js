import React from "react";
import "./styles.css";

const Intro = ({ toggleModal, showModal }) => {
  return (
    <>
      {!showModal ? (
        <button onClick={toggleModal} className="intro">
          BUY OR SELL
        </button>
      ) : null}
    </>
  );
};

export default Intro;
