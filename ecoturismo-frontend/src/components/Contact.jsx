export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 bg-gray-50">
      <h2 className="text-4xl font-bold text-center text-ecoGreen mb-12">Contáctanos 📬</h2>
      <form className="max-w-2xl mx-auto flex flex-col gap-6">
        <input type="text" placeholder="Nombre" className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ecoGreen"/>
        <input type="email" placeholder="Correo electrónico" className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ecoGreen"/>
        <textarea placeholder="Mensaje" rows="5" className="p-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ecoGreen"/>
        <button className="bg-ecoGreen text-white px-6 py-4 rounded-full font-semibold hover:bg-ecoBrown transition">
          Enviar Mensaje
        </button>
      </form>
    </section>
  );
}
