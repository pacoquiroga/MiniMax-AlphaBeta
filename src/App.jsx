import React from "react";
import ArbolInteractivo from "./components/ArbolInteractivo";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <h1 className="text-3xl font-semibold mb-6">Simulación del Algoritmo Minimax</h1>
      <ArbolInteractivo />
    </div>
  );
};

export default App;
