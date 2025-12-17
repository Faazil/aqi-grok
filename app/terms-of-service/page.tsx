// app/terms-of-service/page.tsx
import Link from 'next/link';
import Footer from '../components/Footer';

const TermsOfService = () => {
  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', backgroundColor: '#111', color: 'white', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '40px', backgroundColor: '#222', borderRadius: '16px', lineHeight: '1.8' }}>
        <h1 style={{ textAlign: 'center', color: '#6366f1' }}>Terms of Service</h1>
        <p style={{ textAlign: 'center', color: '#aaa', marginBottom: '40px' }}>Effective: December 2025</p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px' }}>1. Agreement to Terms</h2>
        <p>
          These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (“you”) and <strong>aqiindia.live</strong> (“we,” “us” or “our”), concerning your access to and use of our website. By accessing the Site, you acknowledge that you have read, understood, and agreed to be bound by all of these Terms of Service.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>2. Intellectual Property Rights</h2>
        <p>
          Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the “Content”) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws. The Content is provided on the Site “AS IS” for your information and personal use only.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>3. User Prohibitions</h2>
        <p>
          As a user of the Site, you agree not to:
        </p>
        <ul style={{ paddingLeft: '20px', color: '#ccc' }}>
          <li>Systematically retrieve data or other content from the Site to create or compile, directly or indirectly, a collection, compilation, database, or directory without written permission from us.</li>
          <li>Circumvent, disable, or otherwise interfere with security-related features of the Site.</li>
          <li>Engage in unauthorized framing of or linking to the Site.</li>
          <li>Use the Site in a manner inconsistent with any applicable laws or regulations.</li>
          <li>Automate the use of the system, such as using scripts to send comments or messages, or using any data mining, robots, or similar data gathering and extraction tools.</li>
        </ul>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>4. Site Management and Availability</h2>
        <p>
          We reserve the right, but not the obligation, to: (1) monitor the Site for violations of these Terms of Service; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Terms of Service; and (3) otherwise manage the Site in a manner designed to protect our rights and property and to facilitate the proper functioning of the Site. We cannot guarantee the Site will be available at all times.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>5. Modifications and Interruptions</h2>
        <p>
          We reserve the right to change, modify, or remove the contents of the Site at any time or for any reason at our sole discretion without notice. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Site.
        </p>

        <h2 style={{ color: '#a78bfa', borderBottom: '1px solid #444', paddingBottom: '10px', marginTop: '30px' }}>6. Governing Law</h2>
        <p>
          These Terms shall be governed by and defined following the laws of India. <strong>aqiindia.live</strong> and yourself irrevocably consent that the courts of India shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
        </p>

        <p style={{ marginTop: '40px', textAlign: 'center' }}>
          For more details on data usage, please review our <Link href="/privacy-policy" style={{ color: '#6366f1' }}>Privacy Policy</Link>.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
