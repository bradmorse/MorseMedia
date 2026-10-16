import Image from 'next/image';
import { Gift } from 'lucide-react';
import { ContactForm } from '@/components/Forms';
import { pageMetadata } from '@/lib/seo';

export const metadata = pageMetadata('Gift Certificates for Fine Art Prints', 'Give a Morse Media gift certificate and let them choose the photograph, size and finish. Delivered by email, ready to print or forward.', '/gift-cards', '/images/photos/autumn-overlook.webp');

const amounts = [
  { value: '$100', note: 'An 8 × 10 or 8 × 12 fine-art print' },
  { value: '$250', note: 'A larger print, or a smaller one on canvas or metal' },
  { value: '$500', note: 'A statement piece or a framed pair' },
  { value: 'Any amount', note: 'Choose the value that suits the occasion' },
];

export default function GiftCardsPage() {
  return (
    <>
      <section className="page-hero">
        <Image src="/images/photos/autumn-overlook.webp" alt="Autumn valley and lake in the Adirondacks framed by pine branches" fill priority sizes="100vw" />
        <div className="page-hero__shade page-hero__shade--strong" />
        <div className="page-hero__copy"><p className="eyebrow">Gift certificates</p><h1>Give them<br />the view.</h1></div>
      </section>

      <section className="about-intro content-section">
        <div><p className="eyebrow"><Gift aria-hidden="true" className="inline-icon" /> How it works</p><h2>They choose the photograph. You give the moment.</h2></div>
        <div>
          <p>Choosing art for someone else is hard. A Morse Media gift certificate lets them pick the photograph, size and finish that suits their space — with personal help if they want it.</p>
          <ol className="gift-steps">
            <li>Send the amount, the recipient’s name and when it should arrive using the form below.</li>
            <li>You receive payment details, then a gift certificate by email — ready to print, or sent straight to the recipient on the date you choose.</li>
            <li>They redeem it on any print, either at checkout with their code or by replying to the certificate email.</li>
          </ol>
        </div>
      </section>

      <section className="content-section">
        <div className="material-grid gift-amounts">
          {amounts.map((amount, index) => (
            <article key={amount.value}>
              <span>0{index + 1}</span>
              <h3>{amount.value}</h3>
              <p>{amount.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="contact-layout content-section" id="request">
        <div className="contact-layout__intro">
          <p className="eyebrow">Request a gift certificate</p>
          <h2>Who is it for?</h2>
          <p>Include the amount, the recipient’s name and a delivery date. You will get a reply within two business days — mention it if the gift is needed sooner.</p>
          <a className="contact-email" href="mailto:hello@morsemedia.co?subject=Gift%20certificate">hello@morsemedia.co</a>
        </div>
        <ContactForm defaultType="Gift certificate" />
      </section>
    </>
  );
}
