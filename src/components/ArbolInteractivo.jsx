import React, { useState } from "react";
import ArbolD3 from "./ArbolD3";
import Modal from "./Modal"; 
import Alert from "./Alert"; 

const ArbolInteractivo = () => {
  const [tree, setTree] = useState({
    value: 0,
    children: [],
  });
  const [selectedNode, setSelectedNode] = useState(null);
  const [minimaxResult, setMinimaxResult] = useState(null);
  const [delay, setDelay] = useState(700); 
  const [isRunning, setIsRunning] = useState(false); 
  const [showModal, setShowModal] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(""); 

  const addNode = () => {

    if (!selectedNode) return setErrorMessage("Selecciona un nodo primero");
    if (selectedNode.value !== 0) {
      selectedNode.value = 0;
    }

    selectedNode.children.push({ value: 0, children: [] });
    setTree({ ...tree });
  };

  const handleAssignValue = (value) => {
    if (!selectedNode || selectedNode.children.length > 0) {
      setErrorMessage("Selecciona una hoja para asignarle un valor");
      return; 
    }
    selectedNode.value = parseInt(value, 10);
    setTree({ ...tree });
    setShowModal(false); 
  };

  const minimaxAnimated = async (node, isMaximizing = true) => {
    node.highlight = true;
    setTree({ ...tree });

    await new Promise((resolve) => setTimeout(resolve, delay));

    if (node.children.length === 0) {
      node.highlight = false; 
      setTree({ ...tree });
      return node.value;
    }

    const childValues = [];
    for (const child of node.children) {
      const value = await minimaxAnimated(child, !isMaximizing);
      childValues.push(value);
    }

    const nodeValue = isMaximizing
      ? Math.max(...childValues)
      : Math.min(...childValues);
    node.value = nodeValue;

    node.highlight = false; 
    setTree({ ...tree });
    await new Promise((resolve) => setTimeout(resolve, delay));

    return nodeValue;
  };

  const handleMinimaxAnimated = async () => {
    if (tree.value !== 0) {
      setErrorMessage("El algoritmo ya se ha ejecutado.");
      return;
    }

    setIsRunning(true); 
    await minimaxAnimated(tree);
    setMinimaxResult(tree);
    setIsRunning(false); 
  };

  const handleReset = () => {
    if (isRunning) return;

    setTree({
      value: 0,
      children: [],
    });
    setSelectedNode(null);
    setMinimaxResult(null);
    setErrorMessage(""); 
  };

  return (
    <div className="p-4">
      {errorMessage && <Alert message={errorMessage} type="error" onClose={() => setErrorMessage("")} />}
      
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={addNode}
          disabled={isRunning}
        >
          Agregar Hijo
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
          onClick={() => setShowModal(true)} 
          disabled={isRunning}
        >
          Asignar Valor a Hoja
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleMinimaxAnimated}
          disabled={isRunning}
        >
          Ejecutar Minimax
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleReset}
          disabled={isRunning}
        >
          Reiniciar Árbol
        </button>
      </div>

      <div className="flex items-center mb-4">
        <label htmlFor="delay-slider" className="mr-2 text-white font-medium">
          Delay de Animación ({delay}ms):
        </label>
        <input
          id="delay-slider"
          type="range"
          min="100"
          max="2000"
          step="100"
          value={delay}
          onChange={(e) => setDelay(Number(e.target.value))}
          disabled={isRunning}
          className="slider"
        />
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-2">Árbol Actualizado:</h2>
        <ArbolD3 data={minimaxResult || tree} onNodeSelect={setSelectedNode} />
      </div>

      <Modal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        onAccept={handleAssignValue} 
      />
    </div>
  );
};

export default ArbolInteractivo;
