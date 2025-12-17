// app/about-aqi/page.tsx (CRITICAL FIX: CONTENT EXPANDED FOR ADSENSE APPROVAL)
import Link from 'next/link';
import Footer from '../components/Footer'; 

// Function to safely render m³ (cubic meter) using superscript
const renderM3 = () => <span>m&sup3;</span>;
// Function to safely render µg (microgram) using unicode
const renderMicrogram = () => <span>&micro;g</span>;

const AboutAqiPage = () => {
  return (
    <div style={{ 
      minHeight: '100vh', 
      padding: '40px 20px', 
      backgroundColor: '#111', 
      color: 'white',
      fontFamily: 'sans-serif',
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        padding: '30px', 
        backgroundColor: '#222', 
        borderRadius: '12px',
        lineHeight: '1.6'
      }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1' }}>Understanding the Air Quality Index (AQI)</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>
          Your comprehensive guide to air quality monitoring on Live AQI India.
        </p>

        {/* Section 1: Detailed Introduction (New Content) */}
        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
          What is the Air Quality Index?
        </h2>
        <p>
          The Air Quality Index (AQI) is a critical standardized tool used by government agencies and environmental organizations to communicate the cleanliness of the air we breathe to the public. As urbanization and industrial activity increase across major Indian hubs like Delhi, Mumbai, and Bangalore, monitoring real-time AQI data has become an essential part of daily life for health-conscious citizens.
        </p>
        <p>
          The primary purpose of the AQI is to transform complex chemical concentrations into a single, easy-to-understand number. An increasing AQI value represents higher levels of air pollution and a greater risk to public health, allowing individuals to take protective measures such as using air purifiers or wearing masks.
        </p>

        {/* Section 2: Pollutants and Units */}
        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>
          Major Pollutants Tracked and Their Units
        </h2>
        <p>
          The final AQI number is determined by the pollutant with the highest sub-index value. While the AQI itself is unitless, the specific pollutant concentrations are measured using scientific standards:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            <strong>PM2.5 and PM10:</strong> Fine Particulate Matter. Measured in **{renderMicrogram()}/{renderM3()}** (micrograms per cubic meter). These tiny particles are dangerous as they can enter the bloodstream through the lungs.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Ozone (O<sub>3</sub>):</strong> Measured in **{renderMicrogram()}/{renderM3()}** or **ppb** (parts per billion).
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Nitrogen Dioxide (NO<sub>2</sub>):</strong> Primarily from vehicle emissions; measured in **{renderMicrogram()}/{renderM3()}**.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Carbon Monoxide (CO):</strong> Measured in **mg/{renderM3()}** (milligrams per cubic meter).
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Sulphur Dioxide (SO<sub>2</sub>):</strong> Measured in **{renderMicrogram()}/{renderM3()}**.
          </li>
        </ul>

        {/* Section 3: The Classification Table */}
        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>
          AQI Health Classification System
        </h2>
        <p>
          In India, the National Air Quality Index (NAQI) system uses a color-coded scale to help simplify health warnings:
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '0.9em' }}>
          <thead>
            <tr style={{ backgroundColor: '#444' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>AQI Range</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Health Implication</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Color Code</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: '#16a34a' }}>
              <td style={{ padding: '10px', color: 'black' }}>0 - 50</td>
              <td style={{ padding: '10px', color: 'black' }}><strong>Good:</strong> Air quality is satisfactory; little to no risk.</td>
              <td style={{ padding: '10px', color: 'black' }}>Green</td>
            </tr>
            <tr style={{ backgroundColor: '#65a30d' }}>
              <td style={{ padding: '10px', color: 'black' }}>51 - 100</td>
              <td style={{ padding: '10px', color: 'black' }}><strong>Satisfactory:</strong> Acceptable quality; minor discomfort for sensitive individuals.</td>
              <td style={{ padding: '10px', color: 'black' }}>Light Green</td>
            </tr>
            <tr style={{ backgroundColor: '#ca8a04' }}>
              <td style={{ padding: '10px', color: 'black' }}>101 - 200</td>
              <td style={{ padding: '10px', color: 'black' }}><strong>Moderate:</strong> Sensitive groups may experience health effects.</td>
              <td style={{ padding: '10px', color: 'black' }}>Yellow</td>
            </tr>
            <tr style={{ backgroundColor: '#ea580c' }}>
              <td style={{ padding: '10px', color: 'black' }}>201 - 300</td>
              <td style={{ padding: '10px', color: 'black' }}><strong>Poor:</strong> General public may begin to experience discomfort.</td>
              <td style={{ padding: '10px', color: 'black' }}>Orange</td>
            </tr>
            <tr style={{ backgroundColor: '#dc2626' }}>
              <td style={{ padding: '10px', color: 'white' }}>301 - 400</td>
              <td style={{ padding: '10px', color: 'white' }}><strong>Very Poor:</strong> Risk of respiratory illness on prolonged exposure.</td>
              <td style={{ padding: '10px', color: 'white' }}>Red</td>
            </tr>
            <tr style={{ backgroundColor: '#7f1d1d' }}>
              <td style={{ padding: '10px', color: 'white' }}>401 - 500+</td>
              <td style={{ padding: '10px', color: 'white' }}><strong>Severe:</strong> Hazardous air; avoid all outdoor physical activity.</td>
              <td style={{ padding: '10px', color: 'white' }}>Maroon</td>
            </tr>
          </tbody>
        </table>

        {/* Section 4: Importance of Real-Time Monitoring (New Content) */}
        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>
          Why Use Live AQI India?
        </h2>
        <p>
          At <strong>Live AQI India</strong>, we provide real-time updates because air quality can change drastically within a single hour due to wind patterns, traffic congestion, or local weather conditions. Our platform aggregates data to provide a transparent look at the environmental health of your city.
        </p>
        <p>
          By staying informed, you can make better decisions—such as choosing the best time for outdoor exercise, deciding when to use an air purifier, or knowing when to wear an N95 mask. Our mission is to empower every citizen with the data they need to protect their long-term respiratory health.
        </p>

        <p style={{ marginTop: '30px', textAlign: 'center' }}>
          For more information, please refer to our <Link href="/disclaimer" style={{ color: '#a78bfa' }}>Disclaimer</Link> and <Link href="/privacy-policy" style={{ color: '#a78bfa' }}>Privacy Policy</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutAqiPage;
