import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Terms of Service', 'Terms for purchasing prints and using photographs from Morse Media.', '/terms');

export default function TermsPage() {
  return (
    <section className="policy-page content-section">
      <p className="eyebrow">Legal</p>
      <h1>Terms of service.</h1>
      <div className="policy-page__body">
        <section><h2>Artwork and licensing</h2><p>Purchasing a print transfers ownership of the physical artwork only. Copyright and reproduction rights remain with Bradley Morse / Morse Media. Photographs on this site may not be downloaded, copied or used without a written license.</p></section>
        <section><h2>Orders</h2><p>Prices, dimensions, finishes and availability may change before an order is completed. Orders may be cancelled and refunded if a production option is unavailable or an obvious pricing error occurred.</p></section>
        <section><h2>Color and crop</h2><p>Displays vary, so the final print may differ slightly in color and brightness. Cropping can vary by the selected size and material.</p></section>
        <section><h2>Liability</h2><p>To the extent allowed by law, liability relating to an order is limited to the amount paid for that order.</p></section>
        <p className="policy-disclaimer">Last updated October 2026.</p>
      </div>
    </section>
  );
}
