import { line, curveNatural } from "d3";
export const Line = ({ data, xScale, yScale, xValue, yValue }) => {
  return (
    <g className="line">
      <path
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
