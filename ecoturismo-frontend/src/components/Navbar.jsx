import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { name: "Inicio", path: "/" },
    { name: "Actividades", path: "/actividades" },
    { name: "Lugares", path: "/lugares" },
    { name: "Galería", path: "/galeria" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-md py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center space-x-3 min-w-[160px]">
            <div className="w-12 h-12 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-2xl font-bold">🌿</span>
            </div>
            <div>
              <h1
                className={`text-2xl font-black transition-colors duration-300 ${
                  isScrolled ? "text-green-800" : "text-white"
                }`}
              >
                Ecolibres
              </h1>
              <p
                className={`text-sm transition-colors duration-300 ${
                  isScrolled ? "text-gray-500" : "text-white/80"
                }`}
              >
                Aventuras Naturales
              </p>
            </div>
          </div>

          {/* MENÚ DESKTOP */}
          <ul className="hidden lg:flex items-center space-x-10">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <li key={item.path} className="relative group">
                  <Link
                    to={item.path}
                    className={`font-semibold transition-all duration-300 ${
                      isScrolled
                        ? "text-gray-800 hover:text-green-600"
                        : "text-white hover:text-green-200"
                    }`}
                  >
                    {item.name}
                  </Link>
                  <span
                    className={`absolute left-0 -bottom-1 h-0.5 bg-green-500 transition-all duration-300 ${
                      active ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  ></span>
                </li>
              );
            })}
          </ul>

          {/* BOTONES DESKTOP */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="px-5 py-2 border border-green-600 rounded-xl text-sm font-medium text-green-700 hover:bg-green-600 hover:text-white transition-all duration-300">
              Iniciar Sesión
            </button>
            <button className="px-5 py-2 bg-green-600 text-white rounded-xl text-sm font-medium hover:bg-green-700 transition-all duration-300">
              Reservar Tour
            </button>
          </div>

          {/* BOTÓN HAMBURGUESA MÓVIL */}
          <button
            aria-label="Abrir menú"
            onClick={() => setIsMenuOpen((s) => !s)}
            className="lg:hidden text-3xl focus:outline-none"
          >
            {isMenuOpen ? (
              <span
                className={`transition-colors ${
                  isScrolled ? "text-green-800" : "text-white"
                }`}
              >
                ✕
              </span>
            ) : (
              <span
                className={`transition-colors ${
                  isScrolled ? "text-green-800" : "text-white"
                }`}
              >
                ☰
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* OVERLAY OSCURO */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* MENÚ MÓVIL */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white/95 backdrop-blur-xl shadow-2xl z-50 transform transition-transform duration-500 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col h-full">
          <h2 className="text-2xl font-bold text-green-800 mb-8">Menú</h2>
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors duration-300"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-auto space-y-3">
            <button className="w-full border border-green-600 text-green-700 py-3 rounded-xl font-semibold hover:bg-green-600 hover:text-white transition-all duration-300">
              Iniciar Sesión
            </button>
            <button className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition-all duration-300">
              Reservar Tour
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
