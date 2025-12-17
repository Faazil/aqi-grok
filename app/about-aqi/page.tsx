export default function AboutAQIPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 md:p-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-green-600">What is the Air Quality Index (AQI)?</h1>
      <p className="mb-6 italic">Understanding the air you breathe is the first step toward better health.</p>
      
      <div className="bg-gray-100 p-6 rounded-lg mb-8">
        <h2 className="text-2xl font-semibold mb-3">The AQI Scale</h2>
        <p>The AQI is a system used by government agencies to communicate to the public how polluted the air currently is or how polluted it is forecast to become. As the AQI increases, an increasingly large percentage of the population is likely to experience severe adverse health effects.</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Major Pollutants Tracked:</h2>
      <ul className="list-disc pl-6 space-y-3">
        <li><strong>PM2.5:</strong> Fine particles that can travel deep into the respiratory tract.</li>
        <li><strong>PM10:</strong> Inhalable particles that are usually found near roadways and dusty industries.</li>
        <li><strong>NO2:</strong> Nitrogen Dioxide, primarily gets into the air from the burning of fuel.</li>
      </ul>
    </main>
  );
}
