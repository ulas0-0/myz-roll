import { Minus, Plus } from 'lucide-react';

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

interface Preset {
  label: string;
  base: number;
  skill: number;
  gear: number;
}

const PRESETS: Preset[] = [
  { label: 'Bagarreur', base: 4, skill: 2, gear: 1 },
  { label: 'Tireur', base: 3, skill: 3, gear: 2 },
  { label: 'Rôdeur', base: 2, skill: 4, gear: 1 },
  { label: 'Bricoleur', base: 2, skill: 2, gear: 3 },
  { label: 'Costaud', base: 5, skill: 1, gear: 1 },
  { label: 'Éclaireur', base: 3, skill: 3, gear: 0 },
];

interface DicePoolConfigProps {
  pools: { base: number; skill: number; gear: number };
  onSetPool: (cat: 'base' | 'skill' | 'gear', v: number) => void;
}

const DicePoolConfig = ({ pools, onSetPool }: DicePoolConfigProps) => {
  const applyPreset = (p: Preset) => {
    onSetPool('base', p.base);
    onSetPool('skill', p.skill);
    onSetPool('gear', p.gear);
  };

  return (
    <div className="panel noise-bg">
      <div className="panel-header">▸ Configuration des dés</div>

      {/* Presets */}
      <div className="px-3 pt-2 pb-1 relative z-10">
        <div className="text-[0.6rem] text-muted-foreground uppercase tracking-widest mb-1.5 font-mono">
          Presets rapides
        </div>
        <div className="flex flex-wrap gap-1.5">
          {PRESETS.map(p => {
            const isActive = pools.base === p.base && pools.skill === p.skill && pools.gear === p.gear;
            return (
              <button
                key={p.label}
                onClick={() => applyPreset(p)}
                className={`px-2.5 py-1 text-[0.6rem] font-display font-bold uppercase tracking-wider rounded-sm border transition-colors ${
                  isActive
                    ? 'bg-toxic/20 border-toxic/50 text-toxic'
                    : 'bg-secondary/50 border-border hover:bg-secondary hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground'
                }`}
              >
                {p.label}
                <span className="ml-1 opacity-60 text-[0.5rem]">
                  {p.base}/{p.skill}/{p.gear}
                </span>
              </button>
            );
          })}
        </div>
      </div>

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
    </div>
  );
};

export default DicePoolConfig;
