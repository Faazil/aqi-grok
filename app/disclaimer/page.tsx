// app/disclaimer/page.tsx
import Link from 'next/link';
import Footer from '../components/Footer';

const DisclaimerPage = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', backgroundColor: '#111', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '40px', backgroundColor: '#222', borderRadius: '16px', lineHeight: '1.8' }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1' }}>Legal & Data Disclaimer</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>Effective Date: December 2025</p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px' }}>1. No Medical Advice</h2>
        <p>
          The content on <strong>aqiindia.live</strong>, including text, graphics, and images, is for informational purposes only. The information is not intended to be a substitute for professional medical advice, diagnosis, or treatment. 
        </p>
        <p>
          Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on this website. If you think you may have a medical emergency, call your doctor or the emergency services immediately.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>2. Accuracy of Air Quality Data</h2>
        <p>
          The Air Quality Index (AQI) values provided on this site are aggregated from various third-party sources and public monitoring stations. While we strive for accuracy:
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li><strong>Sensor Calibration:</strong> We do not personally calibrate the sensors providing the data. Data may be affected by local interference or technical malfunctions at the source station.</li>
          <li><strong>Micro-climates:</strong> AQI can vary from one neighborhood to another. The data shown is for the nearest available station and may not reflect the exact air quality at your specific doorstep.</li>
          <li><strong>Real-time Fluctuations:</strong> Environmental data changes rapidly. There may be a delay between the actual air quality change and the update on our dashboard.</li>
        </ul>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>3. Use at Your Own Risk</h2>
        <p>
          Any action you take based on the information found on this website is strictly at your own risk. <strong>Live AQI India</strong> will not be liable for any losses and/or damages in connection with the use of our website. We provide this service "as-is" without any warranties of fitness for a particular purpose.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>4. Affiliation and Endorsements</h2>
        <p>
          References to specific products, processes, or services by trade name, trademark, or manufacturer do not necessarily constitute or imply endorsement or recommendation by <strong>aqiindia.live</strong>. The views and opinions of authors expressed on the site do not necessarily state or reflect those of the government agencies providing the raw data.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>5. Updates and Changes</h2>
        <p>
          We reserve the right to update or change our disclaimer at any time. We encourage users to frequently check this page for any changes to stay informed about how we are providing information. Your continued use of the site after any changes to the disclaimer will constitute your acknowledgment of the modifications.
        </p>

        <p style={{ marginTop: '40px', textAlign: 'center' }}>
          For more information, please read our <Link href="/privacy-policy" style={{ color: '#6366f1' }}>Privacy Policy</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default DisclaimerPage;
