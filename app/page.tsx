import Link from 'next/link';

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
        {/* Hero Section */}
        <header className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Live AQI India</h1>
            <p className="text-xl md:text-2xl opacity-90">Real-time Air Quality Monitoring for Delhi, Mumbai, Bangalore & More</p>
            <p className="mt-4 text-lg">Data powered by WAQI.info</p>
          </div>
        </header>

        {/* Search Bar */}
        <div className="max-w-4xl mx-auto px-4 -mt-8 relative z-10">
          <div className="bg-white rounded-2xl shadow-2xl p-6">
            <input
              type="text"
              placeholder="Search city or location..."
              className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Top Cities Grid */}
        <section className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Current Air Quality - Major Cities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {/* Placeholder cards - we'll fetch real data via /api/india later */}
            {['Delhi', 'Mumbai', 'Bangalore', 'Hyderabad', 'Chennai', 'Kolkata', 'Ahmedabad', 'Pune'].map((city) => (
              <div key={city} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition">
                <h3 className="text-2xl font-semibold text-gray-800">{city}</h3>
                <p className="text-5xl font-bold mt-4 text-orange-500">Loading...</p>
                <p className="text-gray-600 mt-2">PM2.5 dominant</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-8 px-4">
          <div className="max-w-6xl mx-auto text-center">
            <p>&copy; 2025 AQI India Live. All rights reserved.</p>
            <div className="mt-4 space-x-6">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
              <Link href="/privacy" className="hover:underline">Privacy</Link>
              <Link href="/disclaimer" className="hover:underline">Disclaimer</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
