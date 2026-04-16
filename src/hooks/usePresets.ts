import { useState, useCallback, useEffect } from 'react';

export interface Preset {
  id: string;
  label: string;
  base: number;
  skill: number;
  gear: number;
  lastUsed: number;
}

const STORAGE_KEY = 'myz-custom-presets';

const loadPresets = (): Preset[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const savePresets = (presets: Preset[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
};

export function usePresets() {
  const [presets, setPresets] = useState<Preset[]>(loadPresets);

  useEffect(() => {
    savePresets(presets);
  }, [presets]);

  const addPreset = useCallback((label: string, base: number, skill: number, gear: number): string | null => {
    const trimmed = label.trim();
    if (!trimmed) return 'Le nom ne peut pas être vide';
    
    setPresets(prev => {
      const exists = prev.find(p => p.label.toLowerCase() === trimmed.toLowerCase());
      if (exists) {
        // Overwrite existing
        return prev.map(p =>
          p.id === exists.id ? { ...p, base, skill, gear, lastUsed: Date.now() } : p
        );
      }
      return [...prev, { id: crypto.randomUUID(), label: trimmed, base, skill, gear, lastUsed: Date.now() }];
    });
    return null;
  }, []);

  const deletePreset = useCallback((id: string) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  }, []);

  const renamePreset = useCallback((id: string, newLabel: string): string | null => {
    const trimmed = newLabel.trim();
    if (!trimmed) return 'Le nom ne peut pas être vide';
    
    setPresets(prev => {
      const duplicate = prev.find(p => p.label.toLowerCase() === trimmed.toLowerCase() && p.id !== id);
      if (duplicate) return prev; // silently ignore duplicate
      return prev.map(p => p.id === id ? { ...p, label: trimmed } : p);
    });
    return null;
  }, []);

  const touchPreset = useCallback((id: string) => {
    setPresets(prev => prev.map(p => p.id === id ? { ...p, lastUsed: Date.now() } : p));
  }, []);

  const sorted = [...presets].sort((a, b) => b.lastUsed - a.lastUsed);

  return { presets: sorted, addPreset, deletePreset, renamePreset, touchPreset };
}
