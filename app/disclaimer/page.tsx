// app/disclaimer/page.tsx
import Link from 'next/link';
import Footer from '../components/Footer';

const DisclaimerPage = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', backgroundColor: '#111', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '40px', backgroundColor: '#222', borderRadius: '16px', lineHeight: '1.8' }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1' }}>Detailed Disclaimer</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>Last Updated: December 2025</p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px' }}>1. General Information Only</h2>
        <p>
          The information provided by <strong>Live AQI India (aqiindia.live)</strong> is for general informational and educational purposes only. All information on the site is provided in good faith, however, we make no representation or warranty of any kind, express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any information on the site.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>2. Environmental Data Limitation</h2>
        <p>
          The Air Quality Index (AQI) data displayed on this platform is gathered from a variety of sources, including public monitoring stations and third-party APIs like the World Air Quality Index Project. Please be aware that:
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Data Latency:</strong> Real-time data may have a delay of 1 to 4 hours depending on the station reporting frequency.</li>
          <li><strong>Sensor Accuracy:</strong> Low-cost sensors used in some residential areas may fluctuate more than government-grade monitoring stations.</li>
          <li><strong>Local Variations:</strong> Air quality can vary significantly between two streets; our data represents the nearest available monitoring station.</li>
        </ul>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>3. Health and Medical Disclaimer</h2>
        <p>
          <strong>Live AQI India is not a medical organization.</strong> The air quality health suggestions (such as "wear a mask" or "avoid outdoor activity") are based on general guidelines provided by environmental protection agencies. This information does not constitute medical advice. Environmental factors affect every individual differently based on their age, pre-existing conditions, and general health. Always consult with a healthcare professional before making decisions that could impact your respiratory or cardiovascular health.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>4. External Links Disclaimer</h2>
        <p>
          The Site may contain links to other websites or content belonging to or originating from third parties. Such external links are not investigated, monitored, or checked for accuracy by us. We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information offered by third-party websites linked through the site.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>5. Limitation of Liability</h2>
        <p>
          Under no circumstance shall we have any liability to you for any loss or damage of any kind incurred as a result of the use of the site or reliance on any information provided on the site. Your use of the site and your reliance on any information on the site is solely at your own risk.
        </p>

        <p style={{ marginTop: '40px', textAlign: 'center', fontSize: '0.9rem' }}>
          By using this site, you agree to our <Link href="/terms-of-service" style={{ color: '#6366f1' }}>Terms of Service</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default DisclaimerPage;
