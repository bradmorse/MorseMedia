import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Shipping & Returns', 'Production times, shipping and return information for made-to-order Morse Media prints.', '/shipping-returns');

export default function ShippingReturnsPage() {
  return (
    <section className="policy-page content-section">
      <p className="eyebrow">Store information</p>
      <h1>Shipping & returns.</h1>
      <div className="policy-page__body">
        <section><h2>Made to order</h2><p>Every print is produced after purchase. Production time varies by material and size, so delivery estimates include both production and transit time.</p></section>
        <section><h2>Shipping</h2><p>Prints ship with tracking to addresses in the United States and Canada. Shipping charges are shown before you pay, and a tracking link is emailed when your order leaves production.</p></section>
        <section><h2>Damage or defects</h2><p>If an order arrives damaged or has a production defect, photograph the packaging and artwork right away and contact Morse Media promptly with your order reference so a replacement can be arranged.</p></section>
        <section><h2>Returns</h2><p>Because artwork is made to the selected image, size and finish, change-of-mind returns are not accepted. Damaged, defective or incorrectly produced orders are reviewed for replacement.</p></section>
        <p className="policy-disclaimer">Last updated October 2026.</p>
      </div>
    </section>
  );
}
