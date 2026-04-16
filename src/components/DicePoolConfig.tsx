import { Minus, Plus } from 'lucide-react';

interface PoolRowProps {
  label: string;
  sublabel: string;
  value: number;
  onChange: (v: number) => void;
  colorClass: string;
}

const PoolRow = ({ label, sublabel, value, onChange, colorClass }: PoolRowProps) => (
  <div className="flex items-center justify-between gap-3 py-2">
    <div className="flex-1 min-w-0">
      <div className={`font-display text-sm md:text-base font-bold uppercase tracking-wider ${colorClass}`}>
        {label}
      </div>
      <div className="text-[0.6rem] text-muted-foreground truncate">{sublabel}</div>
    </div>
    <div className="flex items-center gap-2">
      <button
        onClick={() => onChange(value - 1)}
        className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-secondary border border-border rounded-sm active:bg-muted transition-colors"
        aria-label="Diminuer"
      >
        <Minus className="w-4 h-4" />
      </button>
      <span className={`font-display text-2xl md:text-3xl font-bold w-8 text-center ${colorClass}`}>
        {value}
      </span>
      <button
        onClick={() => onChange(value + 1)}
        className="w-9 h-9 md:w-10 md:h-10 flex items-center justify-center bg-secondary border border-border rounded-sm active:bg-muted transition-colors"
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

const DicePoolConfig = ({ pools, onSetPool }: DicePoolConfigProps) => (
  <div className="panel">
    <div className="panel-header">▸ Configuration des dés</div>
    <div className="px-3 py-1 divide-y divide-border">
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

export default DicePoolConfig;
