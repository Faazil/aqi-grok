// app/disclaimer/page.tsx
import Link from 'next/link';
import Footer from '../components/Footer'; 

const DisclaimerPage = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', backgroundColor: '#111', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#222', borderRadius: '12px' }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1', borderBottom: '1px solid #444', paddingBottom: '20px' }}>
          Data Disclaimer
        </h1>
        <p style={{ marginTop: '20px', color: '#aaa' }}>
          **Effective Date:** December 17, 2025
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>1. Data Source and Accuracy</h2>
        <p>
          The Air Quality Index (AQI) data displayed on Live AQI India is sourced from the World Air Quality Index (WAQI) project, which aggregates data from various government and monitoring sources globally.
        </p>
        <p>
          We rely entirely on the accuracy and timeliness of this third-party data. We do not independently verify the AQI readings. Factors such as sensor placement, calibration issues, and transmission delays can affect the reported data.
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>2. Not for Official Use</h2>
        <p>
          The information on this website is provided "as is" for general informational and educational purposes only. It is not intended as a substitute for official government reports, regulatory compliance, or professional health/medical advice.
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>3. Health Warning</h2>
        <p>
          **If you are experiencing a health emergency, please contact a medical professional or emergency services immediately.**
        </p>
        <p>
          Relying on any information appearing on this website is solely at your own risk. The owners of Live AQI India are not responsible for any personal health decisions made based on the data presented here.
        </p>

        <p style={{ marginTop: '40px', fontSize: '0.9em', borderTop: '1px solid #444', paddingTop: '20px' }}>
          By using this website, you acknowledge this disclaimer.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default DisclaimerPage;
