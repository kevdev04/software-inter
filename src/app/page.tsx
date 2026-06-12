export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl">
        <h1 className="text-4xl font-bold mb-4">Objetos Perdidos del Campus</h1>
        <p className="text-lg text-gray-600 mb-8">
          Recupera lo que perdiste de forma fácil y rápida
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Reportar Pérdida</h2>
            <p className="text-gray-700">Sube una foto y descripción de lo que perdiste para que otros puedan ayudarte a encontrarlo.</p>
          </div>

          <div className="bg-green-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4">Reportar Hallazgo</h2>
            <p className="text-gray-700">¿Encontraste algo? Comparte los detalles para ayudar a alguien a recuperar su objeto.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
