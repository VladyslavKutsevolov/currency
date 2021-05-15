import React from "react";
import { getPercentageDiff } from "../utils/helpers";

const Diff = ({ data, current, previous }) => {
  const diff = getPercentageDiff(current, previous);

  return (
    <p style={{ textAlign: "center" }}>
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
