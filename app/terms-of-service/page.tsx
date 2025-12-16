// app/terms-of-service/page.tsx
import Link from 'next/link';
import Footer from '../components/Footer'; 

const TermsOfServicePage = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', backgroundColor: '#111', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#222', borderRadius: '12px' }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1', borderBottom: '1px solid #444', paddingBottom: '20px' }}>
          Terms of Service
        </h1>
        <p style={{ marginTop: '20px', color: '#aaa' }}>
          **Effective Date:** December 17, 2025
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>1. Acceptance of Terms</h2>
        <p>
          By accessing and using the website Live AQI India, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>2. Description of Service</h2>
        <p>
          Live AQI India provides users with real-time Air Quality Index (AQI) data sourced from third-party APIs (WAQI). The data is provided for informational and visualization purposes only.
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>3. Intellectual Property</h2>
        <p>
          The content, layout, design, data structures, and features of Live AQI India are the property of the site owner and protected by intellectual property laws. Users may not reproduce, duplicate, copy, sell, or exploit any portion of the service without express written permission.
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>4. Limitation of Liability</h2>
        <p>
          In no event shall Live AQI India be liable for any direct, indirect, incidental, special, or consequential damages arising out of the use or inability to use the service. Please see the <Link href="/disclaimer" style={{ color: '#a78bfa' }}>Disclaimer</Link> for specifics on the data.
        </p>

        <p style={{ marginTop: '40px', fontSize: '0.9em', borderTop: '1px solid #444', paddingTop: '20px' }}>
          This service is provided "as is."
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfServicePage;
