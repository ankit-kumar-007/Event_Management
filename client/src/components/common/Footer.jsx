const Footer = () => {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-8 text-sm text-ink/50 sm:flex-row">
        <p className="font-display text-base text-ink/70">Evento</p>
        <p>Discover events, or host your own — tickets handled through a simple form.</p>
        <p>&copy; {new Date().getFullYear()} Evento</p>
      </div>
    </footer>
  );
};

export default Footer;
