export default function Footer() {
  return (
    <footer className="bg-ecoBrown text-white py-10 px-6 text-center">
      <p className="text-lg font-light">© 2025 <span className="font-semibold">Ecoturismo</span> | Todos los derechos reservados</p>
      <div className="mt-4 flex justify-center gap-6 text-sm text-gray-300 flex-wrap">
        <a href="#privacy" className="hover:text-white transition">Política de privacidad</a>
        <a href="#terms" className="hover:text-white transition">Términos y condiciones</a>
      </div>
    </footer>
  );
}
