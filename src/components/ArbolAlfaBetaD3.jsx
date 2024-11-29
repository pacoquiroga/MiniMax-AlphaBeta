import React, { useRef, useEffect } from "react";
import * as d3 from "d3";

const ArbolAlfaBetaD3 = ({ data, onNodeSelect }) => {
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
      .attr("stroke", (d) => (d.target.data.pruned ? "red" : "gray"))
      .attr("stroke-width", 2)
      .attr("stroke-dasharray", (d) => (d.target.data.pruned ? "4 2" : "0"));

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
      .attr("fill", (d) =>
        !d.children || d.children.length === 0 ? "orange" : "green"
      )
      .attr("stroke", "black")
      .attr("stroke-width", 2)
      .attr("fill-opacity", (d) => (d.data.highlight ? 0.5 : 1));

    // Etiquetas (valores de los nodos)
    nodes
      .append("text")
      .text((d) => d.data.value)
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "white")
      .attr("font-size", 12);

    
    nodes
      .append("text")
      .attr("x", 0)
      .attr("y", 40) 
      .attr("fill", "blue")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .text((d) => `α: ${d.data.alpha ?? "-∞"}`);

    nodes
      .append("text")
      .attr("x", 0)
      .attr("y", 55) 
      .attr("fill", "red")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .text((d) => `β: ${d.data.beta ?? "∞"}`);
  }, [data, onNodeSelect]);

  return <svg ref={svgRef}></svg>;
};

export default ArbolAlfaBetaD3;
