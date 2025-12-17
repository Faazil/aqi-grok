// app/about-aqi/page.tsx (HIGH-VOLUME CONTENT FOR ADSENSE APPROVAL)
import Link from 'next/link';
import Footer from '../components/Footer'; 

const renderM3 = () => <span>m&sup3;</span>;
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
        maxWidth: '850px', 
        margin: '0 auto', 
        padding: '40px', 
        backgroundColor: '#222', 
        borderRadius: '16px',
        lineHeight: '1.8',
        boxShadow: '0 4px 20px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1', fontSize: '2.2rem' }}>The Comprehensive Guide to Air Quality Index (AQI)</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px', fontStyle: 'italic' }}>
          Deep-dive analysis of atmospheric pollutants and their impact on public health in India.
        </p>

        {/* Section 1: Introduction */}
        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
          1. Understanding the Science of AQI
        </h2>
        <p>
          The Air Quality Index (AQI) is much more than just a number; it is a complex calculated metric used by environmental scientists and government agencies to simplify atmospheric data for the general public. As India continues to grow industrially, the concentration of airborne particulates in metropolitan areas like Delhi, Mumbai, and Kolkata has become a primary concern for respiratory health.
        </p>
        <p>
          By consolidating various data points—including particulate matter, ground-level ozone, and toxic gases—into a single scale, the AQI allows citizens to quickly assess the safety of their environment. This transparency is vital in a country where seasonal variations, such as crop burning in the north or coastal humidity in the south, can drastically alter the air we breathe within hours.
        </p>

        {/* Section 2: The Pollutants */}
        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>
          2. The "Silent Killers": Primary Pollutants
        </h2>
        <p>
          To calculate the AQI, we monitor six major pollutants, each with unique characteristics and health risks. The final index is determined by the "leading pollutant"—whichever one has the highest sub-index on a given day.
        </p>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          <li style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
            <strong>Particulate Matter (PM2.5 & PM10):</strong> These are microscopic solids or liquid droplets. PM2.5 is particularly hazardous because these particles are smaller than 2.5 micrometers—small enough to bypass the nose and throat and enter the lungs and bloodstream. They are measured in **{renderMicrogram()}/{renderM3()}**.
          </li>
          <li style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
            <strong>Ground-Level Ozone (O<sub>3</sub>):</strong> Unlike the protective ozone layer in the upper atmosphere, ground-level ozone is a harmful air pollutant created by chemical reactions between oxides of nitrogen (NOx) and volatile organic compounds (VOC) in the presence of sunlight.
          </li>
          <li style={{ marginBottom: '15px', padding: '15px', backgroundColor: '#333', borderRadius: '8px' }}>
            <strong>Nitrogen Dioxide (NO<sub>2</sub>) and Sulfur Dioxide (SO<sub>2</sub>):</strong> Primarily products of fuel combustion from vehicles and power plants. High concentrations can lead to acid rain and severe respiratory inflammation.
          </li>
        </ul>

        {/* Section 3: Health Table */}
        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>
          3. National AQI Categories and Health Benchmarks
        </h2>
        <p>
          The Indian NAQI system utilizes a specific color-coded threshold to warn the population about immediate risks.
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '0.9em' }}>
          <thead>
            <tr style={{ backgroundColor: '#444' }}>
              <th style={{ padding: '12px', textAlign: 'left' }}>AQI Value</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Health Category</th>
              <th style={{ padding: '12px', textAlign: 'left' }}>Potential Impact</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: '#16a34a' }}>
              <td style={{ padding: '12px', color: 'black' }}>0 - 50</td>
              <td style={{ padding: '12px', color: 'black' }}>Good</td>
              <td style={{ padding: '12px', color: 'black' }}>Minimal health impact. Outdoor activities are safe.</td>
            </tr>
            <tr style={{ backgroundColor: '#ca8a04' }}>
              <td style={{ padding: '12px', color: 'black' }}>101 - 200</td>
              <td style={{ padding: '12px', color: 'black' }}>Moderate</td>
              <td style={{ padding: '12px', color: 'black' }}>Discomfort for those with asthma or heart disease.</td>
            </tr>
            <tr style={{ backgroundColor: '#dc2626' }}>
              <td style={{ padding: '12px', color: 'white' }}>301 - 400</td>
              <td style={{ padding: '12px', color: 'white' }}>Very Poor</td>
              <td style={{ padding: '12px', color: 'white' }}>Respiratory illness likely on prolonged exposure.</td>
            </tr>
            <tr style={{ backgroundColor: '#7f1d1d' }}>
              <td style={{ padding: '12px', color: 'white' }}>401 - 500+</td>
              <td style={{ padding: '12px', color: 'white' }}>Severe</td>
              <td style={{ padding: '12px', color: 'white' }}>Hazardous. Emergency conditions for all populations.</td>
            </tr>
          </tbody>
        </table>

        {/* Section 4: Mitigation and Protection */}
        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>
          4. How to Protect Yourself During High Pollution
        </h2>
        <p>
          Knowledge is the first step toward protection. When <strong>Live AQI India</strong> indicates that levels have crossed the "Moderate" threshold, we recommend the following evidence-based actions:
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Air Purification:</strong> Use HEPA-rated air purifiers in indoor spaces, especially in bedrooms during the night when air exchange rates are lower.</li>
          <li><strong>Strategic Venting:</strong> Keep windows closed during peak traffic hours (usually 8 AM - 10 AM and 6 PM - 9 PM) when $NO_2$ levels are highest.</li>
          <li><strong>Protective Gear:</strong> Standard cloth masks do not filter PM2.5. If you must be outdoors during "Poor" or "Severe" days, use an N95 or FFP2 rated respirator.</li>
          <li><strong>Monitoring:</strong> Check our live dashboard before planning outdoor runs or children's playtime. Even a few hours of delay can mean breathing significantly cleaner air.</li>
        </ul>

        {/* Section 5: Mission Statement */}
        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>
          5. Our Commitment to Environmental Transparency
        </h2>
        <p>
          At <strong>aqiindia.live</strong>, we believe that clean air is a fundamental right. Our platform serves as a bridge between complex satellite/ground-sensor data and the everyday citizen. We aggregate real-time data to provide an unbiased, transparent look at the environmental health of Indian cities. By making this data accessible, we hope to foster a community that advocates for cleaner energy, stricter emission standards, and a healthier future for the next generation.
        </p>

        <p style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.9rem', color: '#888' }}>
          Data is sourced via the World Air Quality Index Project. For legal information, see our <Link href="/privacy-policy" style={{ color: '#6366f1' }}>Privacy Policy</Link> and <Link href="/disclaimer" style={{ color: '#6366f1' }}>Disclaimer</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutAqiPage;
