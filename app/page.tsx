export default function Home() {
  const cities = [
    { name: 'Delhi', aqi: 645, dominant: 'PM2.5' },
    { name: 'Mumbai', aqi: 151, dominant: 'PM2.5' },
    { name: 'Bangalore', aqi: 155, dominant: 'PM2.5' },
    { name: 'Hyderabad', aqi: 190, dominant: 'PM2.5' },
    { name: 'Chennai', aqi: 198, dominant: 'PM2.5' },
    { name: 'Kolkata', aqi: 261, dominant: 'PM2.5' },
    { name: 'Ahmedabad', aqi: 187, dominant: 'PM2.5' },
    { name: 'Pune', aqi: 225, dominant: 'PM2.5' },
  ];

  function getAqiColor(aqi: number) {
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-600';
    return 'bg-maroon-700';
  }

  function getAqiLabel(aqi: number) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Hero */}
      <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Live AQI India</h1>
          <p className="text-xl md:text-2xl opacity-90">Real-time Air Quality Monitoring</p>
          <p className="mt-4 text-lg">Data powered by WAQI.info</p>
        </div>
      </header>

      {/* Search */}
      <div className="max-w-4xl mx-auto px-4 -mt-8">
        <input
          type="text"
          placeholder="Search city or location..."
          className="w-full px-6 py-4 text-lg bg-white border-2 border-gray-200 rounded-xl shadow-lg focus:outline-none focus:border-indigo-500"
        />
      </div>

      {/* Cities Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Current Air Quality - Major Cities</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cities.map((city) => (
            <div key={city.name} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition">
              <div className={`h-32 ${getAqiColor(city.aqi)} flex items-center justify-center text-white`}>
                <div className="text-center">
                  <p className="text-6xl font-bold">{city.aqi}</p>
                  <p className="text-xl">{getAqiLabel(city.aqi)}</p>
                </div>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-semibold text-gray-800">{city.name}</h3>
                <p className="text-gray-600 mt-2">{city.dominant} dominant</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
