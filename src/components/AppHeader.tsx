import { useState, useEffect } from 'react';
import { Download, Wifi, WifiOff } from 'lucide-react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

const AppHeader = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    const onOnline = () => setIsOnline(true);
    const onOffline = () => setIsOnline(false);

    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
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
        <div className="flex flex-col items-end gap-1.5">
          {/* Online/Offline indicator */}
          <div className="flex items-center gap-1.5 text-[0.6rem] font-mono">
            {isOnline ? (
              <>
                <Wifi className="w-3 h-3 text-toxic" />
                <span className="text-toxic toxic-glow">EN LIGNE</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-dirty-yellow" />
                <span className="text-dirty-yellow">HORS-LIGNE</span>
              </>
            )}
          </div>

          {/* Install button - shown when available, plus a note about published version */}
          {installPrompt && !installed ? (
            <button
              onClick={handleInstall}
              className="animate-fade-in-up flex items-center gap-1.5 px-2.5 py-1.5 text-[0.65rem] font-display font-bold uppercase tracking-wider bg-toxic/15 border border-toxic/40 rounded-sm text-toxic hover:bg-toxic/25 active:bg-toxic/10 transition-colors"
              style={{ boxShadow: '0 0 8px hsl(90 100% 35% / 0.15)' }}
            >
              <Download className="w-3.5 h-3.5" />
              Installer
            </button>
          ) : !installed ? (
            <a
              href="https://myz-roll.lovable.app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 px-2 py-1 text-[0.55rem] font-display uppercase tracking-wider text-muted-foreground hover:text-toxic/70 transition-colors border border-border/50 rounded-sm"
            >
              <Download className="w-3 h-3" />
              Installer (via site publié)
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
