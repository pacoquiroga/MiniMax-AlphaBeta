import React, { useState } from "react";

const Modal = ({ isOpen, onClose, onAccept }) => {
    const [inputValue, setInputValue] = useState(0);

    const handleAccept = () => {
        onAccept(inputValue);
        onClose();
    };

    return (
        isOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="cookies-card w-[280px] bg-white p-6 rounded-lg shadow-lg relative">
                    <button
                        className="exit-button absolute top-3 right-3 p-2"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 162 162"
                            className="h-5 w-5 text-gray-600"
                        >
                            <path
                                strokeLinecap="round"
                                strokeWidth="17"
                                stroke="black"
                                d="M9.01074 8.98926L153.021 153"
                            ></path>
                            <path
                                strokeLinecap="round"
                                strokeWidth="17"
                                stroke="black"
                                d="M9.01074 153L153.021 8.98926"
                            ></path>
                        </svg>
                    </button>
                    <p className="cookie-heading text-lg font-semibold text-gray-800">
                        Asignar valor a la hoja
                    </p>
                    <input
                        type="number"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="border p-2 rounded w-full mt-3 text-black"
                        placeholder="Introduce el valor"
                    />
                    <div className="button-wrapper mt-4 flex gap-4 justify-between">
                        <button
                            className="accept cookie-button bg-gray-800 text-white p-2 rounded"
                            onClick={handleAccept}
                        >
                            Aceptar
                        </button>
                        <button
                            className="reject cookie-button bg-gray-200 text-gray-800 p-2 rounded"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default Modal;
