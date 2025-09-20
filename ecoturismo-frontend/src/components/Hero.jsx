export default function Hero() {
  return (
    <section
      className="relative h-[90vh] flex items-center justify-center text-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80')" }}
    >
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="relative z-10 px-6 max-w-3xl">
        <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
          Vive la Naturaleza 🌎
        </h2>
        <p className="mt-6 text-lg md:text-xl text-gray-100 leading-relaxed">
          Descubre experiencias únicas de ecoturismo y conecta con la tierra y la cultura local.
        </p>
        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <a
            href="#tours"
            className="bg-white text-ecoGreen px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:bg-ecoBrown hover:text-white transition"
          >
            Ver Tours
          </a>
          <a
            href="#about"
            className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-ecoGreen transition"
          >
            Conócenos
          </a>
        </div>
      </div>
    </section>
  );
}
