import React, { useRef, useState } from "react";
import {
  scaleLinear,
  scaleTime,
  timeFormat,
  extent,
  pointer,
  bisector,
} from "d3";
import { useData } from "../hooks/useData";

import { Line } from "./Line";

import "./chart.css";

const width = 500;
const height = 300;
const margin = { top: 20, right: 120, bottom: 65, left: 90 };

const Chart = () => {
  const data = useData();
  const ref = useRef();
  const focus = ref.current;
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [tooltipDate, setTooltipDate] = useState("");
  const [tooltipRate, setTooltipRate] = useState("");

  const dateFormatter = timeFormat("%m/%d");

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left - margin.right;

  const xValue = (d) => d.date;

  const yValue = (d) => d.rate;

  const xScale = scaleTime()
    .domain(extent(data, xValue))
    .range([0, innerWidth])
    .nice();

  const yScale = scaleLinear()
    .domain(extent(data, yValue))
    .range([innerHeight, 0])
    .nice();

  const bisectDate = bisector(function (d) {
    return d.date;
  }).right;

  function mousemove(event) {
    const x0 = xScale.invert(pointer(event, this)[0]);
    const i = bisectDate(data, x0, 1);
    const d0 = data[i - 1];
    const d1 = data[i];

    const d = d0 && d1 && x0 - d0.date > d1.date - x0 ? d1 : d0;
    if (!d) return;

    setTranslateX(xScale(d.date));
    setTranslateY(yScale(d.rate));
    setTooltipDate(dateFormatter(d.date));
    setTooltipRate(d.rate);
  }

  return (
    <svg width={width} height={height}>
      <g
        transform={`translate(${margin.left},${margin.top})`}
        style={{ overflow: "visible" }}
      >
        <Line
          data={data}
          xScale={xScale}
          yScale={yScale}
          xValue={xValue}
          yValue={yValue}
        ></Line>
        <g
          className="focus"
          ref={ref}
          style={{ display: "none" }}
          transform={`translate(${translateX}, ${translateY})`}
        >
          <circle r="5" />
          <rect
            className="tooltip"
            width="100"
            height="50"
            x="10"
            y="-22"
            rx="4"
            ry="4"
          />
          <text className="tooltip-rate" x="18" y="18">
            Rate: {tooltipRate && tooltipRate.toString()}
          </text>
          <text className="tooltip-date" x="18" y="-2">
            Date: {tooltipDate && tooltipDate}
          </text>
        </g>
        <rect
          className="overlay"
          width={innerWidth}
          height={innerHeight}
          onMouseOver={() => focus && (focus.style.display = null)}
          onMouseOut={() => focus && (focus.style.display = "none")}
          onMouseMove={mousemove}
        />
      </g>
    </svg>
  );
};

export default Chart;
