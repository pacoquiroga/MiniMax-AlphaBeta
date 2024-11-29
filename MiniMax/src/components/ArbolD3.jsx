import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const ArbolD3 = ({ data, onNodeSelect }) => {
  const svgRef = useRef();
  let previousNode = null;

  useEffect(() => {
    const width = 800;
    const height = 600;
  
    const svg = d3
      .select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .classed("bg-gray-100", true);
  
    const treeLayout = d3.tree().size([width, height - 200]);
    const root = d3.hierarchy(data);
    treeLayout(root);
  
    root.y += 70;
  
    svg.selectAll("*").remove();
  
    // Dibujar enlaces entre nodos
    svg
      .selectAll(".link")
      .data(root.links())
      .join("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "gray")
      .attr("stroke-width", 2);
  
    // Dibujar nodos
    const nodes = svg
      .selectAll(".node")
      .data(root.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer")
      .on("click", function (event, d) {
        if (previousNode) {
          d3.select(previousNode).select("circle").attr("fill-opacity", 1);
        }
        d3.select(this).select("circle").attr("fill-opacity", 0.5);
        previousNode = this;
        onNodeSelect(d.data);
      });
  
    // Círculos (representan nodos)
    nodes
      .append("circle")
      .attr("r", 20)
      .attr("fill", (d) => (!d.children || d.children.length === 0 ? "orange" : "green"))
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill-opacity", (d) => d.data.highlight ? 0.5 : 1); // Cambiar opacidad según el estado
  
    // Etiquetas (nombres de los nodos)
    nodes
      .append("text")
      .text((d) => d.data.value)
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "white")
      .attr("font-size", 12);
  
    // Agregar texto para "MIN" o "MAX" en los niveles
    svg
      .selectAll(".levelLabel")
      .data(root.descendants())
      .join("text")
      .attr("class", "levelLabel")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y - 30)
      .attr("text-anchor", "middle")
      .attr("font-size", 14)
      .attr("fill", "black")
      .text((d) => (d.depth % 2 === 0 ? "MAX" : "MIN"));
  }, [data, onNodeSelect]);
  

  return <svg ref={svgRef}></svg>;
};

export default ArbolD3;