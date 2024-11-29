import React, { useState } from "react";
import ArbolD3 from "./ArbolD3";

const ArbolInteractivo = () => {
  const [tree, setTree] = useState({
    value: 0,
    children: [],
  });
  const [selectedNode, setSelectedNode] = useState(null);
  const [minimaxResult, setMinimaxResult] = useState(null);

  const addNode = () => {
    if (!selectedNode) return alert("Selecciona un nodo primero");

    selectedNode.children.push({ value: 0, children: [] });
    setTree({ ...tree });
  };

  const handleAssignValue = (value) => {
    if (!selectedNode || selectedNode.children.length > 0) {
      return alert("Selecciona una hoja para asignarle un valor");
    }
    selectedNode.value = value;
    setTree({ ...tree });
  };

  const minimaxAnimated = async (node, isMaximizing = true, delay = 700) => {
    // Resaltar nodo actual
    node.highlight = true;
    setTree({ ...tree });
  
    await new Promise((resolve) => setTimeout(resolve, delay));
  
    if (node.children.length === 0) {
      node.highlight = false; // Desresaltar cuando termine de evaluar
      setTree({ ...tree });
      return node.value;
    }
  
    const childValues = [];
    for (const child of node.children) {
      const value = await minimaxAnimated(child, !isMaximizing, delay);
      childValues.push(value);
    }
  
    const nodeValue = isMaximizing
      ? Math.max(...childValues)
      : Math.min(...childValues);
    node.value = nodeValue;
  
    node.highlight = false; // Desresaltar nodo actual después de procesarlo
    setTree({ ...tree });
    await new Promise((resolve) => setTimeout(resolve, delay));
  
    return nodeValue;
  };
  

  const handleMinimaxAnimated = async () => {
    if (tree.value !== 0) {
      alert("El algoritmo ya se ha ejecutado.");
    }
    await minimaxAnimated(tree);
    setMinimaxResult(tree);
  };

  const handleReset = () => {
    setTree({
      value: 0,
      children: [],
    });
    setSelectedNode(null);
    setMinimaxResult(null);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={addNode}
        >
          Agregar Hijo
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
          onClick={() =>
            handleAssignValue(prompt("Introduce el valor de la hoja:"))
          }
        >
          Asignar Valor a Hoja
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleMinimaxAnimated}
        >
          Ejecutar Minimax
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
        >
          Reiniciar Árbol
        </button>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Árbol Actualizado:</h2>
        <ArbolD3 data={minimaxResult || tree} onNodeSelect={setSelectedNode} />
      </div>
    </div>
  );
};

export default ArbolInteractivo;