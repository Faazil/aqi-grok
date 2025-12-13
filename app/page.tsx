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
    if (aqi <= 50) return 'bg-green-500';
    if (aqi <= 100) return 'bg-yellow-500';
    if (aqi <= 150) return 'bg-orange-500';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-600';
    return 'bg-gray-900';
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
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-blue-50">
      {/* Hero with Stunning Wallpaper */}
      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('https://i.guim.co.uk/img/media/efafbbda64a4245a9a2c5264d3d55b4517a8410b/48_13_2484_1492/master/2484.jpg?width=2000&quality=85&auto=format&fit=max&s=1e2be23fe873340b3d1e77ebfd462aaa')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-sky-100/80"></div>
        </div>

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-6xl md:text-8xl font-extrabold text-indigo-900 mb-6 drop-shadow-2xl">Live AQI India</h1>
          <p className="text-2xl md:text-4xl text-indigo-800 mb-8">Real-Time Air Quality Across India</p>
          <p className="text-xl text-indigo-700 mb-12">Powered by WAQI.info • Dec 14, 2025</p>
          <input
            type="text"
            placeholder="Search city..."
            className="w-full max-w-2xl px-8 py-5 text-xl bg-white/90 backdrop-blur-md rounded-full shadow-2xl focus:outline-none focus:ring-4 focus:ring-indigo-400"
          />
        </div>
      </header>

      {/* Cities Grid */}
      <section className="max-w-7xl mx-auto px-6 py-20 -mt-32 relative z-20">
        <h2 className="text-5xl font-bold text-center text-gray-800 mb-16">Current Air Quality – Major Cities</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {cities.map((city) => (
            <div key={city.name} className={`group rounded-3xl shadow-2xl overflow-hidden transform hover:scale-105 hover:shadow-4xl transition-all duration-500 bg-white`}>
              <div className={`${getAqiColor(city.aqi)} h-48 flex flex-col items-center justify-center text-white`}>
                <p className="text-7xl font-black">{city.aqi}</p>
                <p className="text-2xl font-bold mt-2">{getAqiLevel(city.aqi)}</p>
              </div>
              <div className="p-8 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-3">{city.name}</h3>
                <p className="text-lg text-gray-600">{city.dominant} Dominant</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips */}
      <section className="max-w-6xl mx-auto px-6 py-16 bg-white/90 rounded-3xl shadow-2xl mb-20">
        <h2 className="text-4xl font-bold text-center mb-12">Quick Health Tips</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-8 bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl">
            <p className="text-6xl mb-4">😷</p>
            <h3 className="text-2xl font-bold mb-2">N95 Masks Outdoors</h3>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl">
            <p className="text-6xl mb-4">🏠</p>
            <h3 className="text-2xl font-bold mb-2">Stay Indoors</h3>
          </div>
          <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl">
            <p className="text-6xl mb-4">🌡️</p>
            <h3 className="text-2xl font-bold mb-2">Use Purifiers</h3>
          </div>
        </div>
      </section>
    </div>
  );
}
