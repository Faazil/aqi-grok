export default function Home() {
  const cities = [
    { name: 'Delhi', aqi: 645, dominant: 'PM2.5' },
    { name: 'Mumbai', aqi: 151, dominant: 'PM2.5' },
    { name: 'Bengaluru', aqi: 155, dominant: 'PM2.5' },
    { name: 'Hyderabad', aqi: 190, dominant: 'PM2.5' },
    { name: 'Chennai', aqi: 198, dominant: 'PM2.5' },
    { name: 'Kolkata', aqi: 261, dominant: 'PM2.5' },
    { name: 'Ahmedabad', aqi: 187, dominant: 'PM2.5' },
    { name: 'Pune', aqi: 225, dominant: 'PM2.5' },
  ];

  function getAqiColor(aqi: number) {
    if (aqi <= 50) return 'from-green-500 to-green-700';
    if (aqi <= 100) return 'from-yellow-400 to-yellow-600';
    if (aqi <= 150) return 'from-orange-500 to-orange-700';
    if (aqi <= 200) return 'from-red-500 to-red-700';
    if (aqi <= 300) return 'from-purple-600 to-purple-800';
    return 'from-gray-800 to-black';
  }

  function getAqiLevel(aqi: number) {
    if (aqi <= 50) return 'Good';
    if (aqi <= 100) return 'Moderate';
    if (aqi <= 150) return 'Unhealthy for Sensitive';
    if (aqi <= 200) return 'Unhealthy';
    if (aqi <= 300) return 'Very Unhealthy';
    return 'Hazardous';
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-50 via-blue-50 to-indigo-100">
      {/* Hero Section with Beautiful Wallpaper */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://i.guim.co.uk/img/media/efafbbda64a4245a9a2c5264d3d55b4517a8410b/48_13_2484_1492/master/2484.jpg?width=1200&quality=85&auto=format&fit=max&s=1e2be23fe873340b3d1e77ebfd462aaa')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/30 to-indigo-900/60"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-extrabold text-white drop-shadow-2xl mb-6">
            Live AQI India
          </h1>
          <p className="text-2xl md:text-4xl text-white/90 drop-shadow-lg mb-8">
            Real-Time Air Quality Monitoring for a Healthier Tomorrow
          </p>
          <p className="text-xl text-white/80 mb-12">Powered by WAQI.info • Updated December 14, 2025</p>

          {/* Glassmorphism Search Bar */}
          <div className="max-w-3xl mx-auto">
            <input
              type="text"
              placeholder="Search any city in India..."
              className="w-full px-10 py-6 text-2xl bg-white/20 backdrop-blur-xl border-4 border-white/30 rounded-full shadow-3xl focus:outline-none focus:ring-8 focus:ring-white/50 text-white placeholder-white/70"
            />
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </header>

      {/* Major Cities Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 -mt-20 relative z-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-800 mb-4">Current Air Quality – Major Cities</h2>
          <p className="text-xl text-gray-600">Live data from official monitoring stations</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {cities.map((city) => (
            <div
              key={city.name}
              className="group relative bg-white/90 backdrop-blur-2xl rounded-3xl shadow-2xl overflow-hidden hover:shadow-4xl hover:-translate-y-6 transition-all duration-700 border border-white/50"
            >
              {/* Color Band */}
              <div className={`h-56 bg-gradient-to-br ${getAqiColor(city.aqi)} flex flex-col items-center justify-center text-white relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10"></div>
                <p className="text-8xl font-extrabold drop-shadow-2xl relative z-10">{city.aqi}</p>
                <p className="text-2xl font-bold mt-3 drop-shadow-lg relative z-10">{getAqiLevel(city.aqi)}</p>
              </div>

              {/* Card Body */}
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-4">{city.name}</h3>
                <p className="text-lg text-gray-600">{city.dominant} Dominant Pollutant</p>
              </div>

              {/* Hover Glow Effect */}
              <div className="absolute inset-0 rounded-3xl ring-4 ring-transparent group-hover:ring-indigo-400/50 transition-all duration-700 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 bg-white/70 backdrop-blur-xl rounded-3xl shadow-3xl mb-20">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Health Tips Based on Current AQI</h2>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="p-10 bg-gradient-to-br from-green-50 to-emerald-100 rounded-3xl shadow-lg">
            <p className="text-6xl mb-6">😷</p>
            <h3 className="text-2xl font-bold mb-4">Use N95 Masks</h3>
            <p className="text-gray-700">Essential in Hazardous areas like Delhi</p>
          </div>
          <div className="p-10 bg-gradient-to-br from-orange-50 to-red-100 rounded-3xl shadow-lg">
            <p className="text-6xl mb-6">🏠</p>
            <h3 className="text-2xl font-bold mb-4">Stay Indoors</h3>
            <p className="text-gray-700">Reduce exposure, especially for children & elderly</p>
          </div>
          <div className="p-10 bg-gradient-to-br from-purple-50 to-indigo-100 rounded-3xl shadow-lg">
            <p className="text-6xl mb-6">🌿</p>
            <h3 className="text-2xl font-bold mb-4">Use Air Purifiers</h3>
            <p className="text-gray-700">Keep windows closed & purify indoor air</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-xl mb-4">&copy; 2025 Live AQI India – Breathe Better, Live Healthier</p>
          <p className="text-opacity-80">Data sourced from WAQI.info</p>
        </div>
      </footer>
    </div>
  );
}
