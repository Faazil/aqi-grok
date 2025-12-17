export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto p-6 md:p-12 text-gray-800">
      <h1 className="text-4xl font-bold mb-6 text-blue-600">About AQI India Live</h1>
      <p className="text-lg mb-6 leading-relaxed">
        Welcome to <strong>aqiindia.live</strong>, India's emerging hub for real-time air quality monitoring. 
        In an era where air pollution affects millions, our goal is to provide transparent, 
        instant, and actionable data to every citizen.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
      <p className="mb-6">
        We believe that access to clean air data is a fundamental right. By aggregating 
        real-time data from various sensors across the country, we help you decide when 
        it’s safe to go for a run, when to keep the windows closed, and how to protect 
        your family from invisible pollutants.
      </p>
      <h2 className="text-2xl font-semibold mb-4">Expertise & Data</h2>
      <p>
        Our platform is built using modern web technologies like Next.js to ensure 
        lightning-fast updates. We prioritize data integrity and user experience, 
        making complex environmental metrics easy for anyone to understand.
      </p>
    </main>
  );
}
