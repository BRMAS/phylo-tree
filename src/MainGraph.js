import React, { useRef, useEffect } from 'react';

import * as d3 from 'd3';
import './PhyloTreeStyles.css';

let color = null;

const width = 800;
const height = 800;
const outerRadius = width / 2;
const innerRadius = 290;//outerRadius-120;

const legend = (svg) => {

  const g = svg
    .selectAll("g")
    .data(color.domain())
    .join("g")
      .attr("transform", (d, i) => `translate(${-outerRadius},${-outerRadius + i * 20})`);

  g.append("rect")
      .attr("width", 18)
      .attr("height", 18)
      .attr("fill", color);

  g.append("text")
      .attr("x", 24)
      .attr("y", 9)
      .attr("dy", "0.35em")
      .text(d => d);
}


function setRadius(d, y0, k) {
  //console.log(d, y0, k, d.data);
  d.radius = (y0 += d.data.length) * k;
  if (d.children) d.children.forEach(d => setRadius(d, y0, k));
}

function maxLength(d) {
  return d.data.length + (d.children ? d3.max(d.children, maxLength) : 0);
}

function linkExtensionConstant(d) {
  return linkStep(d.target.x, d.target.y, d.target.x, innerRadius);
}

function linkExtensionVariable(d) {
  return linkStep(d.target.x, d.target.radius, d.target.x, innerRadius);
}

function linkConstant(d) {
  //console.log(d.source);
  return linkStep(d.source.x, d.source.y, d.target.x, d.target.y);
}
function linkVariable(d) {
  return linkStep(d.source.x, d.source.radius, d.target.x, d.target.radius);
}

function linkStep(startAngle, startRadius, endAngle, endRadius) {
  const c0 = Math.cos(startAngle = (startAngle - 90) / 180 * Math.PI);
  const s0 = Math.sin(startAngle);
  const c1 = Math.cos(endAngle = (endAngle - 90) / 180 * Math.PI);
  const s1 = Math.sin(endAngle);
  return "M" + startRadius * c0 + "," + startRadius * s0
      + (endAngle === startAngle ? "" : "A" + startRadius + "," + startRadius + " 0 0 " + (endAngle > startAngle ? 1 : 0) + " " + startRadius * c1 + "," + startRadius * s1)
      + "L" + endRadius * c1 + "," + endRadius * s1;
}

function mouseovered(active) {
  return function(event, d) {
    d3.select(this).classed("label--active", active);
    d3.select(d.linkExtensionNode).classed("link-extension--active", active).raise(); // unknown
    // 跑線的顏色
    // do d3.select(d.linkNode).classed("link--active", active).raise();
    // while (d = d.parent);
  };
}


export default function MainGraph({treeData, svgWidth, svgHeight, showInfo}) {
  const svgRef = useRef(null);
  //console.log(treeData, 'mg');

  useEffect(() => {
    const svgEle = svgRef.current;
    const root = d3.hierarchy(treeData, d => d.branchset)
                   .sum(d => d.branchset ? 0 : 1)
                   .sort((a, b) => (a.value - b.value) || d3.ascending(a.data.length, b.data.length));

    const handleClick = () => {
      return function(event, d) {
        let key = event.target.innerHTML;
        key = key.replace('B. ', 'Begonia '); // TODO
        d3.selectAll('svg text').attr('class', '');
        d3.select(event.target).attr('class', 'current-item');

        //clear link--active
        d3.selectAll('.link--active').attr('class', '');
        // draw line to parent
        do d3.select(d.linkNode).classed("link--active", true).raise();
        while (d = d.parent);

        showInfo(key);
      }
    }

    d3.cluster()
      .size([360, innerRadius])
      .separation((a, b) => 1)(root);
    color = d3.scaleOrdinal(); //??
    setRadius(root, root.data.length = 0, innerRadius / maxLength(root));
    //const svg = d3.select('#foo')
    //              .append('svg')
    const svg = d3.select(svgEle)
                  .attr("viewBox", [-outerRadius, -outerRadius, width, width])
                  .attr("font-family", "sans-serif")
                  .attr("font-size", 14);

    svg.append("g")
       .call(legend);
    svg.append("style").text(`
.link--active-x {
  stroke: #308ed0 !important;
  stroke-width: 1.5px;
}

.link-extension--active {
  stroke-opacity: .6;
}

.label--active-x {
  font-weight: bold;
}`);

    const linkExtension = svg.append("g")
                             .attr("fill", "none")
                             .attr("stroke", "#000")
                             .attr("stroke-opacity", 0.25)
                             .selectAll("path")
                             .data(root.links().filter(d => !d.target.children))
                             .join("path")
                             .each(function(d) { d.target.linkExtensionNode = this;})
                             .attr("d", linkExtensionConstant);


    const link = svg.append("g")
                    .attr("fill", "none")
                    .attr("stroke", "#000")
                    .selectAll("path")
                    .data(root.links())
                    .join("path")
                    .each(function(d) { d.target.linkNode = this; })
                    .attr("d", linkConstant)
                    .attr("stroke", d => d.target.color);

    svg.append("g")
       .selectAll("text")
       .data(root.leaves())
       .join("text")
       .attr("dy", ".31em")
       .attr("transform", d => `rotate(${d.x - 90}) translate(${innerRadius + 4},0)${d.x < 180 ? "" : " rotate(180)"}`)
       .attr("text-anchor", d => d.x < 180 ? "start" : "end")
       .text(d => d.data.name.replace(/_/g, ". "))
       .on('click', handleClick())
       .on("mouseover", mouseovered(true))
       .on("mouseout", mouseovered(false));

    //console.log(svgRef.current.getBoundingClientRect()); TODO: auto count width
  }, []);

    return (
      <svg ref={svgRef} width={svgWidth} height={svgHeight}></svg>
  )
}
