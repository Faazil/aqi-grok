// app/privacy-policy/page.tsx
import Link from 'next/link';
import Footer from '../components/Footer'; 

const PrivacyPolicyPage = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', backgroundColor: '#111', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '30px', backgroundColor: '#222', borderRadius: '12px' }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1', borderBottom: '1px solid #444', paddingBottom: '20px' }}>
          Privacy Policy
        </h1>
        <p style={{ marginTop: '20px', color: '#aaa' }}>
          **Last Updated:** December 17, 2025
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>1. Information We Collect</h2>
        <p>
          We do not collect any personally identifiable information (PII) from users of this website. We operate as an air quality data visualization tool.
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>2. Third-Party Services (Google AdSense & Cookies)</h2>
        <p>
          We use Google AdSense to serve advertisements on our website. Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to this and other websites.
        </p>
        <p>
          * The DoubleClick DART cookie is used by Google in the ads served on publisher websites displaying AdSense for content ads.
        </p>
        <p>
          * This allows Google and its partners to serve ads to your users based upon their visit to your sites and/or other sites on the Internet.
        </p>
        <p>
          * Users may opt-out of the use of the DART cookie by visiting the Google Ad and Content Network privacy policy.
        </p>

        <h2 style={{ color: '#a78bfa', marginTop: '30px' }}>3. Data Location</h2>
        <p>
          The air quality data displayed on this site is sourced from the World Air Quality Index (WAQI) project and is publicly available. We do not store historical AQI data ourselves.
        </p>
        
        <p style={{ marginTop: '40px', fontSize: '0.9em', borderTop: '1px solid #444', paddingTop: '20px' }}>
          For any questions about this Privacy Policy, please refer to our <Link href="/terms-of-service" style={{ color: '#a78bfa' }}>Terms of Service</Link> or <Link href="/disclaimer" style={{ color: '#a78bfa' }}>Disclaimer</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicyPage;
