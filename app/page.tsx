import { CloudIcon, SunIcon } from '@heroicons/react/24/outline'; // npm install @heroicons/react if not there

export default function Home() {
  const cities = [
    { name: 'Delhi', aqi: 550, dominant: 'PM2.5', label: 'Hazardous' },
    { name: 'Mumbai', aqi: 156, dominant: 'PM2.5', label: 'Unhealthy' },
    { name: 'Bangalore', aqi: 149, dominant: 'PM2.5', label: 'Unhealthy for Sensitive' },
    { name: 'Hyderabad', aqi: 152, dominant: 'PM2.5', label: 'Unhealthy' },
    { name: 'Chennai', aqi: 151, dominant: 'PM2.5', label: 'Unhealthy' },
    { name: 'Kolkata', aqi: 200, dominant: 'PM2.5', label: 'Unhealthy' },
    { name: 'Ahmedabad', aqi: 130, dominant: 'PM2.5', label: 'Unhealthy for Sensitive' },
    { name: 'Pune', aqi: 150, dominant: 'PM2.5', label: 'Unhealthy' },
  ];

  function getAqiColor(aqi: number) {
    if (aqi <= 50) return 'bg-green-400';
    if (aqi <= 100) return 'bg-yellow-400';
    if (aqi <= 150) return 'bg-orange-400';
    if (aqi <= 200) return 'bg-red-500';
    if (aqi <= 300) return 'bg-purple-600';
    return 'bg-gray-800';
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
      {/* Hero with Wallpaper */}
      <header className="relative overflow-hidden bg-gradient-to-r from-indigo-800 via-purple-800 to-pink-800 text-white py-20 px-4">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599669454699-248893623440?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')" }} // Free Unsplash: Clean Delhi skyline at dusk
          }}
        ></div>
        <div className="relative max-w-7xl mx-auto text-center z-10">
          <h1 className="text-6xl md:text-7xl font-bold mb-4 drop-shadow-lg">Live AQI India</h1>
          <p className="text-2xl md:text-3xl opacity-95 mb-6">Breathe Easy – Track Real-Time Air Quality Across India</p>
          <p className="text-lg mb-8">Powered by WAQI.info | Updated: Dec 14, 2025</p>
          <div className="max-w-4xl mx-auto">
            <input
              type="text"
              placeholder="Search city or ZIP code..."
              className="w-full px-8 py-5 text-xl bg-white/20 backdrop-blur-md border-2 border-white/30 rounded-2xl shadow-2xl focus:outline-none focus:border-white/50 text-white placeholder-gray-200"
            />
          </div>
        </div>
      </header>

      {/* AdSense Leaderboard Spot */}
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        {/* Replace with: <ins class="adsbygoogle" style="display:inline-block;width:728px;height:90px" data-ad-client="ca-pub-XXXX" data-ad-slot="XXXX"></ins><script>(adsbygoogle = window.adsbygoogle || []).push({});</script> */}
        <div className="bg-gray-200 h-24 rounded-xl flex items-center justify-center text-gray-500">AdSense Banner Here (728x90)</div>
      </div>

      {/* Cities Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Current Air Quality – Major Cities</h2>
          <p className="text-lg text-gray-600">Tap cards for details & forecasts</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {cities.map((city) => (
            <div 
              key={city.name} 
              className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2 border border-white/50"
            >
              <div className={`h-40 ${getAqiColor(city.aqi)} flex flex-col items-center justify-center text-white p-4 group-hover:scale-105 transition-transform`}>
                <CloudIcon className="h-12 w-12 mb-2 opacity-80" />
                <p className="text-6xl font-bold drop-shadow-lg">{city.aqi}</p>
                <p className="text-xl font-semibold drop-shadow-md">{city.label}</p>
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{city.name}</h3>
                <p className="text-gray-600">{city.dominant} Dominant Pollutant</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Health Tips Section – Boosts Engagement */}
      <section className="max-w-6xl mx-auto px-4 py-16 bg-white/50 rounded-3xl mx-4 -mt-8 shadow-xl">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Quick Health Tips for Today's AQI</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-green-50 to-blue-50">
            <SunIcon className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wear a Mask</h3>
            <p className="text-gray-600">N95 for outdoor activities in Hazardous zones like Delhi.</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-yellow-50 to-orange-50">
            <CloudIcon className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Stay Indoors</h3>
            <p className="text-gray-600">Limit exposure during peak hours (10 AM - 4 PM).</p>
          </div>
          <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50">
            <SunIcon className="h-12 w-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Hydrate & Monitor</h3>
            <p className="text-gray-600">Drink water, use apps for alerts in Unhealthy cities.</p>
          </div>
        </div>
      </section>

      {/* AdSense Sidebar Spot */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-3"> {/* Main content placeholder */} </div>
          <div className="bg-gray-200 h-64 rounded-xl flex items-center justify-center text-gray-500 md:col-span-1">AdSense Sidebar (300x250)</div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 px-4 mt-16">
        <div className="max-w-6xl mx-auto text-center">
          <p>&copy; 2025 Live AQI India. Breathe Better, Live Longer.</p>
          <div className="mt-6 space-x-6">
            <a href="/about" className="hover:underline">About</a>
            <a href="/contact" className="hover:underline">Contact</a>
            <a href="/privacy" className="hover:underline">Privacy</a>
            <a href="/disclaimer" className="hover:underline">Disclaimer</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
