import { useState } from 'react';
import { Minus, Plus, Save, Trash2, Pencil, Check, X } from 'lucide-react';
import { usePresets, Preset } from '@/hooks/usePresets';

interface PoolRowProps {
  label: string;
  sublabel: string;
  value: number;
  onChange: (v: number) => void;
  colorClass: string;
}

const PoolRow = ({ label, sublabel, value, onChange, colorClass }: PoolRowProps) => (
  <div className="flex items-center justify-between gap-3 py-2.5 relative z-10">
    <div className="flex-1 min-w-0">
      <div className={`font-display text-sm md:text-base font-bold uppercase tracking-wider ${colorClass}`}>
        {label}
      </div>
      <div className="text-[0.6rem] text-muted-foreground truncate">{sublabel}</div>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(value - 1)}
        className="pool-btn w-10 h-10 md:w-11 md:h-11"
        aria-label="Diminuer"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className={`font-display text-2xl md:text-3xl font-bold w-8 text-center ${colorClass}`}>
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="pool-btn w-10 h-10 md:w-11 md:h-11"
        aria-label="Augmenter"
      >
        <Plus className="w-4 h-4" />
      </button>
    </div>
  </div>
);

interface DicePoolConfigProps {
  pools: { base: number; skill: number; gear: number };
  onSetPool: (cat: 'base' | 'skill' | 'gear', v: number) => void;
}

const DicePoolConfig = ({ pools, onSetPool }: DicePoolConfigProps) => {
  const { presets, addPreset, deletePreset, renamePreset, touchPreset } = usePresets();
  const [saveName, setSaveName] = useState('');
  const [showSave, setShowSave] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [deleteTarget, setDeleteTarget] = useState<Preset | null>(null);
  const [saveError, setSaveError] = useState('');

  const applyPreset = (p: Preset) => {
    onSetPool('base', p.base);
    onSetPool('skill', p.skill);
    onSetPool('gear', p.gear);
    touchPreset(p.id);
  };

  const handleSave = () => {
    const trimmed = saveName.trim();
    if (!trimmed) {
      setSaveError('Le nom ne peut pas être vide');
      return;
    }
    const existing = presets.find(p => p.label.toLowerCase() === trimmed.toLowerCase());
    if (existing) {
      setSaveError('');
      // Overwrite existing preset
      addPreset(trimmed, pools.base, pools.skill, pools.gear);
      setSaveName('');
      setShowSave(false);
      return;
    }
    const err = addPreset(trimmed, pools.base, pools.skill, pools.gear);
    if (err) {
      setSaveError(err);
      return;
    }
    setSaveName('');
    setShowSave(false);
    setSaveError('');
  };

  const handleRename = (id: string) => {
    renamePreset(id, editName);
    setEditingId(null);
  };

  const handleConfirmDelete = () => {
    if (deleteTarget) {
      deletePreset(deleteTarget.id);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="panel noise-bg">
      <div className="panel-header">▸ Configuration des dés</div>

      {/* Dice rows */}
      <div className="px-3 py-1 divide-y divide-border relative z-10">
        <PoolRow
          label="Attribut"
          sublabel="Force, Agilité, Intelligence, Empathie"
          value={pools.base}
          onChange={v => onSetPool('base', v)}
          colorClass="text-dirty-yellow"
        />
        <PoolRow
          label="Compétence"
          sublabel="Dés de compétence"
          value={pools.skill}
          onChange={v => onSetPool('skill', v)}
          colorClass="text-toxic"
        />
        <PoolRow
          label="Équipement"
          sublabel="Dés de matériel"
          value={pools.gear}
          onChange={v => onSetPool('gear', v)}
          colorClass="text-destructive"
        />
      </div>

      {/* Presets section */}
      <div className="px-3 pt-2 pb-3 relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="text-[0.6rem] text-muted-foreground uppercase tracking-widest font-mono">
            Presets sauvegardés
          </div>
          <button
            onClick={() => { setShowSave(!showSave); setSaveError(''); setSaveName(''); }}
            className="flex items-center gap-1 px-2 py-1 text-[0.6rem] font-display font-bold uppercase tracking-wider rounded-sm border border-toxic/30 bg-toxic/10 text-toxic hover:bg-toxic/20 transition-colors"
          >
            <Save className="w-3 h-3" />
            Sauvegarder
          </button>
        </div>

        {/* Save input */}
        {showSave && (
          <div className="mb-2 flex gap-1.5 items-start">
            <div className="flex-1">
              <input
                type="text"
                value={saveName}
                onChange={e => { setSaveName(e.target.value); setSaveError(''); }}
                onKeyDown={e => e.key === 'Enter' && handleSave()}
                placeholder="Nom du preset..."
                className="w-full h-8 px-2 text-xs font-mono bg-secondary/60 border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-toxic/50"
                autoFocus
                maxLength={30}
              />
              {saveError && (
                <div className="text-[0.55rem] text-destructive mt-0.5">{saveError}</div>
              )}
            </div>
            <button
              onClick={handleSave}
              className="h-8 px-2 rounded-sm border border-toxic/40 bg-toxic/15 text-toxic hover:bg-toxic/25 transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setShowSave(false)}
              className="h-8 px-2 rounded-sm border border-border bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Preset list */}
        {presets.length === 0 ? (
          <div className="text-[0.6rem] text-muted-foreground/60 italic py-2 text-center font-mono">
            Aucun preset sauvegardé
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {presets.map(p => {
              const isActive = pools.base === p.base && pools.skill === p.skill && pools.gear === p.gear;
              const isEditing = editingId === p.id;

              return (
                <div
                  key={p.id}
                  className={`flex items-center gap-1.5 px-2 py-1.5 rounded-sm border transition-colors ${
                    isActive
                      ? 'bg-toxic/15 border-toxic/40'
                      : 'bg-secondary/40 border-border hover:bg-secondary/60'
                  }`}
                >
                  {isEditing ? (
                    <input
                      type="text"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                      onKeyDown={e => {
                        if (e.key === 'Enter') handleRename(p.id);
                        if (e.key === 'Escape') setEditingId(null);
                      }}
                      className="flex-1 h-6 px-1.5 text-[0.65rem] font-mono bg-background border border-border rounded-sm text-foreground focus:outline-none focus:border-toxic/50"
                      autoFocus
                      maxLength={30}
                    />
                  ) : (
                    <button
                      onClick={() => applyPreset(p)}
                      className="flex-1 text-left min-w-0"
                    >
                      <span className={`text-[0.65rem] font-display font-bold uppercase tracking-wider truncate block ${isActive ? 'text-toxic' : 'text-foreground'}`}>
                        {p.label}
                      </span>
                    </button>
                  )}

                  <span className="text-[0.5rem] font-mono text-muted-foreground whitespace-nowrap">
                    {p.base}/{p.skill}/{p.gear}
                  </span>

                  {isEditing ? (
                    <>
                      <button onClick={() => handleRename(p.id)} className="p-0.5 text-toxic hover:text-toxic-glow transition-colors">
                        <Check className="w-3 h-3" />
                      </button>
                      <button onClick={() => setEditingId(null)} className="p-0.5 text-muted-foreground hover:text-foreground transition-colors">
                        <X className="w-3 h-3" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => { setEditingId(p.id); setEditName(p.label); }}
                        className="p-0.5 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Renommer"
                      >
                        <Pencil className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => setDeleteTarget(p)}
                        className="p-0.5 text-muted-foreground hover:text-destructive transition-colors"
                        aria-label="Supprimer"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Delete confirmation inline */}
      {deleteTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70" onClick={() => setDeleteTarget(null)}>
          <div className="panel noise-bg border-destructive/40 max-w-xs w-[90vw] p-4 space-y-3" onClick={e => e.stopPropagation()}>
            <div className="font-display text-destructive uppercase tracking-wider text-base font-bold">
              Supprimer le preset
            </div>
            <div className="text-xs text-muted-foreground">
              Supprimer <span className="font-bold text-foreground">« {deleteTarget.label} »</span> ? Cette action est irréversible.
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setDeleteTarget(null)}
                className="flex-1 h-9 text-xs font-display font-bold uppercase tracking-wider rounded-sm border border-border bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleConfirmDelete}
                className="flex-1 h-9 text-xs font-display font-bold uppercase tracking-wider rounded-sm border border-destructive/40 bg-destructive/20 text-destructive hover:bg-destructive/30 transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DicePoolConfig;
