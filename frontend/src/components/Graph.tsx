import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';

type DataPoint = {
  x: number;
  y: number;
}

type ChartProps = {
  data: DataPoint[];
}

export  function Graph(props: ChartProps) {
  const { data } = props;

  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (ref.current) {
      const margin = { top: 20, right: 20, bottom: 30, left: 50 };
      const width = ref.current.clientWidth - margin.left - margin.right;
      const height = ref.current.clientHeight - margin.top - margin.bottom;

      const svg = d3.select(ref.current)
        .append('g')
        .attr('transform', `translate(${margin.left}, ${margin.top})`);

      const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d => d.x) as [number, number])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.y) as number])
        .range([height, 0]);

      const xAxis = d3.axisBottom(xScale);
      const yAxis = d3.axisLeft(yScale);

      svg.append('g')
        .attr('transform', `translate(0, ${height})`)
        .call(xAxis);

      svg.append('g')
        .call(yAxis);

      const line = d3.line<DataPoint>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));

      svg.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'purple')
        .attr('stroke-width', 2)
        .attr('d', line);
    }
  }, [data]);

  return (
    <div className='text-yellow-500'>
      <svg ref={ref} />
    </div>
  );
}
