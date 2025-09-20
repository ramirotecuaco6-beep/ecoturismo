export default function Navbar() {
  return (
    <nav className="bg-ecoGreen text-white px-10 py-6 flex justify-between items-center shadow-lg fixed w-full z-50">
      <h1 className="text-3xl font-extrabold tracking-wide">🌿 Ecoturismo</h1>
      <ul className="flex gap-8 text-lg font-medium">
        <li><a href="#tours" className="hover:text-ecoBrown transition">Tours</a></li>
        <li><a href="#about" className="hover:text-ecoBrown transition">Nosotros</a></li>
        <li><a href="#contact" className="hover:text-ecoBrown transition">Contacto</a></li>
      </ul>
    </nav>
  );
}
