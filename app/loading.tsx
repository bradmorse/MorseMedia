export default function Loading() {
  return (
    <section className="page-loading" aria-label="Loading page" aria-busy="true">
      <div className="page-loading__logo" />
      <div className="page-loading__line" />
      <div className="page-loading__line page-loading__line--short" />
    </section>
  );
}
