import React, { useState } from "react";
import ArbolInteractivo from "./components/ArbolInteractivo";
import ArbolInteractivoAlfaBeta from "./components/ArbolInteractivoAlfaBeta";

const App = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState("minimax");

  const getButtonStyle = (algorithm) => ({
    backgroundColor: activeAlgorithm === algorithm ? "#1E3A8A" : "#2563EB",
    color: activeAlgorithm === algorithm ? "#FFFFFF" : "#FFFFFF", 
  });

  return (
    <div className="flex min-h-screen bg-gray-800"> 
      <div
        style={{ backgroundColor: "#E0F2FE" }} 
        className="w-64 flex flex-col items-center py-6"
      >
        <h2
          style={{ color: "#0A3981" }} 
          className="text-2xl font-bold mb-8"
        >
          Menú
        </h2>
        <button
          onClick={() => setActiveAlgorithm("minimax")}
          style={getButtonStyle("minimax")}
          className="w-48 px-4 py-2 mb-4 text-lg font-semibold rounded-lg transition-all hover:bg-blue-700"
        >
          Minimax
        </button>
        <button
          onClick={() => setActiveAlgorithm("alphabeta")}
          style={getButtonStyle("alphabeta")}
          className="w-48 px-4 py-2 text-lg font-semibold rounded-lg transition-all hover:bg-blue-700"
        >
          Poda Alfa-Beta
        </button>
      </div>

      <div className="flex-grow flex flex-col items-center justify-center p-8 text-white"> 
        <h1 className="text-4xl font-bold mb-6 text-gray-200">
          {activeAlgorithm === "minimax"
            ? "Simulación del Algoritmo Minimax"
            : "Simulación de Poda Alfa-Beta"}
        </h1>
        {activeAlgorithm === "minimax" && <ArbolInteractivo />}
        {activeAlgorithm === "alphabeta" && <ArbolInteractivoAlfaBeta />}
      </div>
    </div>
  );
};

export default App;
