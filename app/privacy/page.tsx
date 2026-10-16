import { pageMetadata } from '@/lib/seo';

export const metadata = { ...pageMetadata('Privacy Policy', 'How Morse Media collects and uses information submitted through this website.', '/privacy'), robots: { index: true, follow: true } };

export default function PrivacyPage() {
  return (
    <section className="policy-page content-section">
      <p className="eyebrow">Legal</p>
      <h1>Privacy policy.</h1>
      <div className="policy-page__body">
        <section><h2>Information collected</h2><p>The site collects the details you submit through the contact and newsletter forms, and the information needed to process an order. Payment card information is handled by Stripe and is never stored by Morse Media.</p></section>
        <section><h2>How information is used</h2><p>Information is used to respond to inquiries, send requested updates, process purchases, coordinate production and delivery, prevent fraud and improve the website.</p></section>
        <section><h2>Analytics</h2><p>The site uses Google Analytics to understand which pages are visited. It does not sell personal information or use it for third-party advertising.</p></section>
        <section><h2>Service providers</h2><p>Information may be shared with payment, hosting, analytics, email and print-fulfillment providers only as needed to operate the site and complete orders.</p></section>
        <section><h2>Your choices</h2><p>You can unsubscribe from emails at any time or ask for your information to be updated or deleted by contacting hello@morsemedia.co.</p></section>
        <p className="policy-disclaimer">Last updated October 2026.</p>
      </div>
    </section>
  );
}
