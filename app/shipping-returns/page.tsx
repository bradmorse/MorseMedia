import type { Metadata } from 'next';

export const metadata: Metadata = { title: 'Shipping & Returns' };

export default function ShippingReturnsPage() {
  return (
    <section className="policy-page content-section">
      <p className="eyebrow">Store information</p>
      <h1>Shipping & returns.</h1>
      <div className="policy-page__body">
        <section><h2>Made to order</h2><p>Every print is produced after purchase. Production time varies by material and size, so delivery estimates shown at checkout include both production and transit time.</p></section>
        <section><h2>Shipping</h2><p>Orders are prepared for insured delivery to the address entered during checkout. Available regions and shipping charges are displayed before payment.</p></section>
        <section><h2>Damage or defects</h2><p>Photograph the packaging and artwork immediately if an order arrives damaged or has a production defect, then contact Morse Media with the order reference.</p></section>
        <section><h2>Returns</h2><p>Because artwork is made to the selected image, size and finish, change-of-mind returns are generally not accepted. Damaged, defective or incorrectly produced orders will be reviewed for replacement.</p></section>
        <p className="policy-disclaimer">Replace this starter policy with terms reviewed for your business and final fulfillment agreement before accepting live orders.</p>
      </div>
    </section>
  );
}
