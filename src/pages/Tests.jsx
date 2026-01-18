import { useState } from "react";

export const Tests = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 bg-blue-500 text-white rounded"
      >
        ☰
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Mi Sidebar</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="text-2xl hover:text-red-500"
            >
              ✕
            </button>
          </div>

          <nav>
            <ul className="space-y-4">
              <li>
                <a href="#" className="block p-2 hover:bg-gray-100">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#" className="block p-2 hover:bg-gray-100">
                  Perfil
                </a>
              </li>
              <li>
                <a href="#" className="block p-2 hover:bg-gray-100">
                  Configuración
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
};
