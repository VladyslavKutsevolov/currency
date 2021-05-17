import React from "react";
import { getPercentageDiff } from "../utils/helpers";

const Diff = ({ current, previous }) => {
  const diff = getPercentageDiff(current, previous);

  return (
    <p style={{ fontSize: "1.2em" }}>
      {diff > 0 ? (
        <i className="fas fa-long-arrow-alt-up" style={{ color: "#009933" }} />
      ) : (
        <i class="fas fa-long-arrow-alt-down" style={{ color: "#ff0000" }} />
      )}

      <span style={{ color: diff > 0 ? "#009933" : "#ff0000" }}>{diff}%</span>
    </p>
  );
};

export default Diff;
