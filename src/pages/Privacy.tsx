export function Privacy() {
  return (
    <div className="bg-white dark:bg-slate-950 min-h-screen transition-colors duration-300">
      <section className="hero-section">
        <div className="container-wide">
          <h1 className="label-muted">Legal</h1>
          <h2>Privacy Policy</h2>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-wide max-w-3xl">
          <div className="prose prose-slate dark:prose-invert prose-lg">
            <p>Applied Policy Systems LLC is committed to protecting your privacy. This policy outlines how we handle information.</p>
            <p>We do not sell or share your personal information with third parties for marketing purposes.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
