import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const AppHeader = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setInstallPrompt(null);
  };

  return (
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
        <div className="flex flex-col items-end gap-1">
          <div className="hidden sm:block text-[0.6rem] text-muted-foreground font-mono">
            SYS.STATUS: <span className="toxic-glow text-[0.65rem]">OPÉRATIONNEL</span>
          </div>
          {installPrompt && !installed && (
            <button
              onClick={handleInstall}
              className="animate-fade-in-up flex items-center gap-1.5 px-2.5 py-1.5 text-[0.65rem] font-display font-bold uppercase tracking-wider bg-toxic/15 border border-toxic/40 rounded-sm text-toxic hover:bg-toxic/25 active:bg-toxic/10 transition-colors"
              style={{ boxShadow: '0 0 8px hsl(90 100% 35% / 0.15)' }}
            >
              <Download className="w-3.5 h-3.5" />
              Installer
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
