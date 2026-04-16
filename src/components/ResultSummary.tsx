import { motion } from 'framer-motion';
import { RollResult } from '@/types/dice';

interface ResultSummaryProps {
  roll: RollResult | null;
}

const ResultSummary = ({ roll }: ResultSummaryProps) => {
  if (!roll) return null;

  const hasDamage = roll.baseDamage > 0 || roll.gearDamage > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="panel"
    >
      <div className="panel-header">▸ Bilan</div>
      <div className="px-4 py-3 space-y-2">
        {/* Successes */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground uppercase tracking-wider">Succès</span>
          <span className={`font-display text-3xl font-bold ${roll.successes > 0 ? 'toxic-glow' : 'text-muted-foreground'}`}>
            {roll.successes}
          </span>
        </div>

        {/* Outcome */}
        <div className="text-center py-1">
          {roll.successes === 0 ? (
            <span className="font-display text-lg text-muted-foreground uppercase">Échec</span>
          ) : roll.successes >= 3 ? (
            <span className="font-display text-lg text-toxic uppercase tracking-wider">Succès critique !</span>
          ) : (
            <span className="font-display text-lg text-toxic uppercase tracking-wider">Réussi !</span>
          )}
        </div>

        {/* Damage from push */}
        {roll.pushed && hasDamage && (
          <div className="border-t border-border pt-2 space-y-1">
            {roll.baseDamage > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-dirty-yellow">☠ Dégâts d'attribut</span>
                <span className="font-display text-xl font-bold text-dirty-yellow">{roll.baseDamage}</span>
              </div>
            )}
            {roll.gearDamage > 0 && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-destructive">⚙ Dégâts d'équipement</span>
                <span className="font-display text-xl font-bold text-destructive">{roll.gearDamage}</span>
              </div>
            )}
          </div>
        )}

        {roll.pushed && !hasDamage && (
          <div className="border-t border-border pt-2 text-center text-sm text-muted-foreground">
            Aucun dégât subi.
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ResultSummary;
