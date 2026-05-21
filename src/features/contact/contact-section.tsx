export function ContactSection() {
  return (
    <section id="contact" className="relative py-section px-page bg-transparent text-foreground min-h-[60vh] flex items-center">
      <div className="max-w-container mx-auto w-full text-center">
        <h2 className="text-4xl md:text-7xl font-display font-semibold tracking-tight mb-6">
          Ready to build?
        </h2>
        <p className="text-lg md:text-2xl font-light text-foreground/70 max-w-2xl mx-auto mb-12">
          I'm currently open for new opportunities and interesting projects.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="mailto:prog.raunak@gmail.com"
            className="inline-flex items-center justify-center w-full sm:w-auto rounded-full border border-foreground/30 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-foreground hover:text-background hover:border-foreground bg-transparent text-foreground"
          >
            prog.raunak@gmail.com
          </a>
          <a
            href="https://www.linkedin.com/in/raunak-prasad-og/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto rounded-full border border-foreground/30 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] bg-transparent text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/rauni-rainy"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center w-full sm:w-auto rounded-full border border-foreground/30 px-8 py-4 text-sm font-medium tracking-widest uppercase transition-all duration-300 hover:bg-[#333] hover:text-white hover:border-[#333] bg-transparent text-foreground"
          >
            GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
