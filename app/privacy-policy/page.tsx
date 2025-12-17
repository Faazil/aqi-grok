// app/privacy-policy/page.tsx
import Link from 'next/link';
import Footer from '../components/Footer';

const PrivacyPolicy = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', backgroundColor: '#111', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '40px', backgroundColor: '#222', borderRadius: '16px', lineHeight: '1.8' }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1' }}>Privacy Policy</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>Last Updated: December 2025</p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px' }}>1. Introduction and Scope</h2>
        <p>
          Welcome to <strong>Live AQI India (aqiindia.live)</strong>. We are committed to protecting your personal privacy and maintaining a transparent relationship with our users. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website to check real-time air quality data. By using our service, you consent to the data practices described in this policy.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>2. Information We Collect</h2>
        <p><strong>Log Data:</strong> Like most website operators, we collect information that your browser sends whenever you visit our Site. This may include your computer’s IP address, browser type, browser version, the pages of our Site that you visit, the time and date of your visit, and the time spent on those pages.</p>
        <p><strong>Location Data:</strong> To provide accurate local AQI readings, the site may request access to your approximate location via your browser. We do not store this geographical data on our servers; it is used solely to filter the dashboard view for your current city.</p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>3. Google AdSense and Cookies</h2>
        <p>
          We use Google AdSense to serve advertisements. Google, as a third-party vendor, uses cookies to serve ads based on a user's prior visits to your website or other websites.
        </p>
        <ul style={{ paddingLeft: '20px' }}>
          <li>Google's use of advertising cookies enables it and its partners to serve ads to your users based on their visit to your sites and/or other sites on the Internet.</li>
          <li>Users may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" style={{ color: '#6366f1' }}>Ads Settings</a>.</li>
          <li>We also utilize analytical cookies (such as Google Analytics) to understand traffic patterns, which helps us optimize the site's performance for users in high-pollution zones.</li>
        </ul>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>4. Data Protection Rights (GDPR/CCPA)</h2>
        <p>
          Regardless of your location, we aim to provide high standards of data protection. You have the right to request copies of your data, request that we correct any information you believe is inaccurate, and request that we erase your data under certain conditions. Since we do not require user accounts or store personal names/emails, our data footprint is minimal.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>5. Third-Party Data Sources</h2>
        <p>
          Our air quality data is sourced from the World Air Quality Index (WAQI) Project. While we display this data, we do not control their privacy practices. We encourage users to review the privacy statements of any third-party providers we link to in our footer.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>6. Security of Data</h2>
        <p>
          The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee its absolute security.
        </p>

        <p style={{ marginTop: '40px', textAlign: 'center' }}>
          Questions? Contact us at our support channel or view our <Link href="/terms-of-service" style={{ color: '#6366f1' }}>Terms of Service</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
