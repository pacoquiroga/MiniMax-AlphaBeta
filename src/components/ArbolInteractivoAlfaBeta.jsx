import React, { useState } from "react";
import ArbolAlfaBetaD3 from "./ArbolAlfaBetaD3";
import Alert from "./Alert"; 
import Modal from "./Modal"; 

const ArbolInteractivoAlfaBeta = () => {
  const [tree, setTree] = useState({
    value: 0,
    children: [],
  });
  const [selectedNode, setSelectedNode] = useState(null);
  const [delay, setDelay] = useState(700);
  const [isRunning, setIsRunning] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addNode = () => {
    if (!selectedNode) {
      setErrorMessage("Selecciona un nodo primero");
      return;
    }
    
    if (selectedNode.value !== 0) {
      selectedNode.value = 0;
    }
    
    selectedNode.children.push({ value: 0, children: [], alpha: -Infinity, beta: Infinity });
    setTree({ ...tree });
    setErrorMessage(""); 
  };

  const handleAssignValue = () => {
    if (!selectedNode || selectedNode.children.length > 0) {
      setErrorMessage("Selecciona una hoja para asignarle un valor");
      return; 
    }
    setIsModalOpen(true); 
  };

  const handleValueAccepted = (value) => {
    selectedNode.value = parseInt(value, 10);
    setTree({ ...tree });
    setErrorMessage(""); 
  };

  const alphaBetaAnimated = async (node, alpha = -Infinity, beta = Infinity, isMaximizing = true) => {
    node.highlight = true;
    node.alpha = alpha; // Asignar alpha al nodo
    node.beta = beta; // Asignar beta al nodo
    setTree({ ...tree });
    await new Promise((resolve) => setTimeout(resolve, delay));
  
    if (node.children.length === 0) {
      node.highlight = false;
      setTree({ ...tree });
      return node.value;
    }
  
    let value = isMaximizing ? -Infinity : Infinity;
  
    for (let i = 0; i < node.children.length; i++) {
      const child = node.children[i];
  
      const childValue = await alphaBetaAnimated(
        child,
        alpha,
        beta,
        !isMaximizing
      );
  
      if (isMaximizing) {
        value = Math.max(value, childValue);
        alpha = Math.max(alpha, value);
      } else {
        value = Math.min(value, childValue);
        beta = Math.min(beta, value);
      }
  
      node.alpha = alpha;
      node.beta = beta;
      setTree({ ...tree });
  
      
      if (beta <= alpha) {
        if (i + 1 < node.children.length) {
          node.children[i + 1].pruned = true; 
        }
        break; 
      }
    }
  
    node.value = value;
    node.highlight = false;
    setTree({ ...tree });
    await new Promise((resolve) => setTimeout(resolve, delay));
  
    return value;
  };
  

  const handleAlphaBetaAnimated = async () => {
    if (tree.value !== 0) {
      setErrorMessage("El algoritmo ya se ha ejecutado.");
      return; 
    }

    setIsRunning(true);
    await alphaBetaAnimated(tree);
    setIsRunning(false);
  };

  const handleReset = () => {
    if (isRunning) return; 

    setTree({
      value: 0,
      children: [],
    });
    setSelectedNode(null);
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
          onClick={handleAssignValue}
          disabled={isRunning}
        >
          Asignar Valor a Hoja
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded mr-2"
          onClick={handleAlphaBetaAnimated}
          disabled={isRunning}
        >
          Ejecutar Alfa-Beta
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
        <ArbolAlfaBetaD3 data={tree} onNodeSelect={setSelectedNode} />
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAccept={handleValueAccepted}
      />
    </div>
  );
};

export default ArbolInteractivoAlfaBeta;
