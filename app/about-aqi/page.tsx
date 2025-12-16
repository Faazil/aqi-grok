// app/about-aqi/page.tsx (FINAL VERSION WITH POLLUTANT UNITS ADDED)
import Link from 'next/link';
import Footer from '../components/Footer'; 

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
        borderRadius: '12px'
      }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1' }}>Understanding the Air Quality Index (AQI)</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>
          Your guide to the air quality data displayed on Live AQI India.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px' }}>
          What is AQI?
        </h2>
        <p>
          The Air Quality Index (AQI) is a tool used by government agencies to communicate to the public how polluted the air currently is or how polluted it is forecasted to become. It measures the concentration of several key pollutants and represents them with a single, easy-to-understand number and color code.
        </p>
        <p>
          The primary purpose of the AQI is to help people understand how local air quality affects their health. An increasing AQI value means an increasing level of air pollution and a greater health risk.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>
          The Six Major Pollutants Tracked and Their Units
        </h2>
        <p>
          The final AQI number is determined by the pollutant with the highest sub-index value. Note that while the AQI itself is unitless, the pollutant concentrations are measured in the following standard units:
        </p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          <li style={{ marginBottom: '10px' }}>
            <strong>PM2.5 and PM10:</strong> Fine Particulate Matter. Measured in **$\mu \text{g}/\text{m}^3$** (micrograms per cubic meter).
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Ozone (O<sub>3</sub>):</strong> Measured in **$\mu \text{g}/\text{m}^3$** or **ppb** (parts per billion).
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Nitrogen Dioxide (NO<sub>2</sub>):</strong> Measured in **$\mu \text{g}/\text{m}^3$** or **ppb**.
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Carbon Monoxide (CO):</strong> Measured in **$\text{mg}/\text{m}^3$** (milligrams per cubic meter) or **ppm** (parts per million).
          </li>
          <li style={{ marginBottom: '10px' }}>
            <strong>Sulphur Dioxide (SO<sub>2</sub>):</strong> Measured in **$\mu \text{g}/\text{m}^3$** or **ppb**.
          </li>
        </ul>
        

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>
          AQI Health Classification System
        </h2>
        <p>
          We use the standard health classification based on the AQI number:
        </p>
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', fontSize: '0.9em' }}>
          <thead>
            <tr style={{ backgroundColor: '#444' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>AQI Range</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Health Implication</th>
              <th style={{ padding: '10px', textAlign: 'left' }}>Color Used on Site</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ backgroundColor: '#16a34a' }}>
              <td style={{ padding: '10px', color: 'black' }}>0 - 50</td>
              <td style={{ padding: '10px', color: 'black' }}>**Good:** Air quality is satisfactory, and air pollution poses little or no risk.</td>
              <td style={{ padding: '10px', color: 'black' }}>Green</td>
            </tr>
            <tr style={{ backgroundColor: '#65a30d' }}>
              <td style={{ padding: '10px', color: 'black' }}>51 - 100</td>
              <td style={{ padding: '10px', color: 'black' }}>**Satisfactory:** Air quality is acceptable; however, for some pollutants, there may be a moderate health concern for a very small number of people.</td>
              <td style={{ padding: '10px', color: 'black' }}>Light Green/Yellow-Green</td>
            </tr>
            <tr style={{ backgroundColor: '#ca8a04' }}>
              <td style={{ padding: '10px', color: 'black' }}>101 - 200</td>
              <td style={{ padding: '10px', color: 'black' }}>**Moderate:** Members of sensitive groups may experience health effects. The general public is less likely to be affected.</td>
              <td style={{ padding: '10px', color: 'black' }}>Orange/Yellow</td>
            </tr>
            <tr style={{ backgroundColor: '#ea580c' }}>
              <td style={{ padding: '10px', color: 'black' }}>201 - 300</td>
              <td style={{ padding: '10px', color: 'black' }}>**Poor:** Everyone may begin to experience health effects; members of sensitive groups may experience more serious health effects.</td>
              <td style={{ padding: '10px', color: 'black' }}>Red-Orange</td>
            </tr>
            <tr style={{ backgroundColor: '#dc2626' }}>
              <td style={{ padding: '10px', color: 'white' }}>301 - 400</td>
              <td style={{ padding: '10px', color: 'white' }}>**Very Poor:** Health warnings of emergency conditions. The entire population is likely to be affected.</td>
              <td style={{ padding: '10px', color: 'white' }}>Red</td>
            </tr>
            <tr style={{ backgroundColor: '#7f1d1d' }}>
              <td style={{ padding: '10px', color: 'white' }}>401 - 500+</td>
              <td style={{ padding: '10px', color: 'white' }}>**Severe:** Air quality is hazardous. Everyone should avoid all physical activity outdoors.</td>
              <td style={{ padding: '10px', color: 'white' }}>Maroon/Dark Red</td>
            </tr>
          </tbody>
        </table>

        <p style={{ marginTop: '30px' }}>
          For more information, please refer to our <Link href="/disclaimer" style={{ color: '#a78bfa' }}>Disclaimer</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default AboutAqiPage;
