const AppHeader = () => (
  <header className="panel border-b-2 border-toxic/30 px-4 py-3 noise-bg scanline relative overflow-hidden">
    <div className="relative z-10 flex items-center justify-between">
      <div>
        <h1 className="font-display text-2xl md:text-3xl tracking-wider text-dirty-yellow">
          MUTANT<span className="text-toxic">:</span> ANNÉE ZÉRO
        </h1>
        <p className="text-[0.65rem] tracking-[0.3em] text-muted-foreground uppercase">
          // Système de lancer de dés — v1.0
        </p>
      </div>
      <div className="hidden sm:flex flex-col items-end gap-0.5">
        <div className="text-[0.6rem] text-muted-foreground font-mono">
          SYS.STATUS: <span className="toxic-glow text-[0.65rem]">OPÉRATIONNEL</span>
        </div>
        <div className="text-[0.5rem] text-muted-foreground/50 font-mono">
          ▸ MODE HORS-LIGNE DISPONIBLE
        </div>
      </div>
    </div>
  </header>
);

export default AppHeader;
