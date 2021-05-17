import { useEffect, useRef, useState } from "react";
import { line, curveNatural, transition, easeSin, select } from "d3";
export const Line = ({ data, xScale, yScale, xValue, yValue }) => {
  const ref = useRef();
  const [pathLength, setPathLength] = useState(0);

  useEffect(() => {
    setPathLength(ref.current.getTotalLength());
  }, [data]);

  useEffect(() => {
    const path = select(ref.current);
    path
      .attr("stroke-dashoffset", pathLength)
      .attr("stroke-dasharray", pathLength)
      .transition(transition().ease(easeSin).duration(2500))
      .attr("stroke-dashoffset", 0);
  }, [pathLength]);

  return (
    <g className="line">
      <path
        ref={ref}
        fill="none"
        stroke="#0099ff"
        strokeWidth="3"
        d={line()
          .x((d) => xScale(xValue(d)))
          .y((d) => yScale(yValue(d)))
          .curve(curveNatural)(data)}
      />
    </g>
  );
};
