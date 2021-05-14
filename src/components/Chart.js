import * as d3 from "d3";

import React, { useCallback, useEffect, useRef } from "react";

const Chart = ({ data }) => {
  const margin = { left: 150, top: 60, right: 20, bottom: 70 };
  const width = 900;
  const height = 500;

  const ref = useRef();

  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const render = useCallback(
    (data) => {
      console.log("data", data);
      const svg = ref.current;
      const chart = d3.select(svg);
      const title = "CAD to USD";

      const xValue = (d) => d.date;
      const xAxisLabel = "Date";

      const yValue = (d) => d.rate;
      const yAxisLabel = "Rate";

      const x = d3
        .scaleTime()
        .domain(d3.extent(data, xValue))
        .range([0, chartWidth])
        .nice();

      const y = d3
        .scaleLinear()
        .domain(d3.extent(data, yValue))
        .range([chartHeight, 0])
        .nice();

      const yAxis = d3.axisLeft(y).tickSize(-chartWidth).tickPadding(15);

      const xAxis = d3.axisBottom(x).tickSize(-chartHeight).tickPadding(10);

      const gBar = chart
        .append("g")
        .attr("transform", `translate(${margin.left} ${margin.top})`);

      const yAxisG = gBar.append("g").call(yAxis);

      yAxisG.selectAll(".domain").remove();

      yAxisG
        .append("text")
        .attr("class", "yaxis-label")
        .attr("y", -55)
        .attr("x", -chartHeight / 2)
        .attr("fill", "black")
        .attr("transform", `rotate(-90)`)
        .attr("text-anchor", "middle")
        .text(yAxisLabel);

      const xAxisG = gBar
        .append("g")
        .call(xAxis)
        .attr("transform", `translate(0, ${chartHeight})`);

      xAxisG.select(".domain").remove();

      xAxisG
        .append("text")
        .attr("class", "xaxis-label")
        .attr("y", 55)
        .attr("x", chartWidth / 2)
        .attr("fill", "black")
        .text(xAxisLabel);

      const line = d3
        .line()
        .x((d) => x(xValue(d)))
        .y((d) => y(yValue(d)));

      gBar
        .append("path")
        .attr("stroke", "black")
        .attr("stroke-linejoin", "round")
        .attr("fill", "none")
        .attr("d", line(data));

      gBar.append("text").attr("class", "title").attr("y", -10).text(title);
    },
    [data]
  );

  useEffect(() => {
    render(data);
  }, [data]);
  return (
    <div>
      <svg className="line-chart" ref={ref} style={{ width, height }}></svg>
    </div>
  );
};

export default Chart;
