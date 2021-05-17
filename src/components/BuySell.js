import React from "react";

const style = {
  marginTop: "5px",
  padding: "15px 65px",
  textAlign: "center",
  textTransform: "uppercase",
  transition: "0.5s",
  border: "1px solid #0099ff",
  borderRadius: "10px",
  background: "#fff",
  display: "block",
  color: "#0099ff",
  cursor: "pointer",
};

const BuySell = ({ medianRate, currentRate }) => {
  return (
    <div>
      {currentRate > medianRate ? (
        <button style={style}>Buy USD</button>
      ) : (
        <button style={style}>Sell USD</button>
      )}
    </div>
  );
};

export default BuySell;
