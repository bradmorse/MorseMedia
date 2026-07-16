import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service' };

export default function TermsPage() {
  return (
    <section className="policy-page content-section">
      <p className="eyebrow">Legal</p>
      <h1>Terms of service.</h1>
      <div className="policy-page__body">
        <section><h2>Artwork and licensing</h2><p>Purchasing a print transfers ownership of the physical artwork only. Copyright and reproduction rights remain with Morse Media.</p></section>
        <section><h2>Orders</h2><p>Prices, dimensions, finishes and availability may change before an order is completed. Orders may be cancelled and refunded if a production option is unavailable or an obvious pricing error occurred.</p></section>
        <section><h2>Color and crop</h2><p>Displays vary, so the final print may differ slightly in color and brightness. Cropping can vary by the selected size and material.</p></section>
        <section><h2>Liability</h2><p>To the extent allowed by law, liability relating to an order is limited to the amount paid for that order.</p></section>
        <p className="policy-disclaimer">This is a starter template and not legal advice. Review it before opening the store to the public.</p>
      </div>
    </section>
  );
}
