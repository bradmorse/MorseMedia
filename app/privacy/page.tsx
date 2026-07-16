import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Privacy Policy' };

export default function PrivacyPage() {
  return (
    <section className="policy-page content-section">
      <p className="eyebrow">Legal</p>
      <h1>Privacy policy.</h1>
      <div className="policy-page__body">
        <section><h2>Information collected</h2><p>The site may collect contact details submitted through forms and the information required to process an order. Payment card information is handled by Stripe and is not stored by Morse Media.</p></section>
        <section><h2>How information is used</h2><p>Information is used to respond to inquiries, process purchases, coordinate production and delivery, prevent fraud and improve the website.</p></section>
        <section><h2>Service providers</h2><p>Order information may be shared with payment, hosting, analytics, email and fulfillment providers only as needed to operate the store.</p></section>
        <section><h2>Contact</h2><p>Questions about personal information can be submitted through the contact page.</p></section>
        <p className="policy-disclaimer">This is a starter policy and should be reviewed for your actual tools, location and business practices before launch.</p>
      </div>
    </section>
  );
}
