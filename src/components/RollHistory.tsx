import { RollResult } from '@/types/dice';

interface RollHistoryProps {
  history: RollResult[];
}

const formatTime = (ts: number) => {
  const d = new Date(ts);
  return d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
};

const RollHistory = ({ history }: RollHistoryProps) => {
  if (history.length === 0) return null;

  return (
    <div className="panel noise-bg">
      <div className="panel-header">▸ Historique ({history.length})</div>
      <div className="max-h-48 overflow-y-auto relative z-10">
        {history.map((roll, i) => (
          <div
            key={roll.timestamp + '-' + i}
            className={`px-3 py-2 text-xs flex items-center justify-between border-b border-border/50 ${i === 0 ? 'bg-muted/30' : ''}`}
          >
            <span className="text-muted-foreground font-mono">{formatTime(roll.timestamp)}</span>
            <span className="text-muted-foreground">
              {roll.pools.base}A + {roll.pools.skill}C + {roll.pools.gear}E
            </span>
            <span className={`font-display font-bold ${roll.successes > 0 ? 'text-toxic' : 'text-muted-foreground'}`}>
              {roll.successes} ✦
            </span>
            <span className="text-muted-foreground">
              {roll.pushed ? '☠' : ''}
              {roll.baseDamage > 0 ? ` ${roll.baseDamage}T` : ''}
              {roll.gearDamage > 0 ? ` ${roll.gearDamage}E` : ''}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RollHistory;
