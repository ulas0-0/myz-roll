import { motion, AnimatePresence } from 'framer-motion';
import { DieResult, RollResult } from '@/types/dice';
import { SuccessSymbol, TraumaSymbol, GearDamageSymbol, NeutralSymbol } from './DiceSymbols';

const dieCategoryLabel = {
  base: 'Attribut',
  skill: 'Compétence',
  gear: 'Équipement',
};

/** Returns the appropriate symbol component for a die face */
const getDieSymbol = (die: DieResult) => {
  const isSuccess = die.value === 6;
  const isTrauma = die.value === 1 && die.category === 'base';
  const isGearDamage = die.value === 1 && die.category === 'gear';

  if (isSuccess) return <SuccessSymbol size={26} className="die-symbol-success" />;
  if (isTrauma) return <TraumaSymbol size={26} className="die-symbol-trauma" />;
  if (isGearDamage) return <GearDamageSymbol size={26} className="die-symbol-gear-damage" />;
  return <NeutralSymbol size={26} className="die-symbol-neutral" />;
};

const DieFace = ({ die, index }: { die: DieResult; index: number }) => {
  const isSuccess = die.value === 6;
  const isDamage = die.pushed && die.value === 1 && die.category !== 'skill';

  const categoryClass = {
    base: 'die-base',
    skill: 'die-skill',
    gear: 'die-gear',
  }[die.category];

  return (
    <motion.div
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
      className={`die-face ${categoryClass} ${isSuccess ? 'die-success' : ''} ${isDamage ? 'die-damage' : ''}`}
      title={`${die.category} — ${die.value}`}
    >
      {/* Scratched texture overlay */}
      <div className="die-texture" />
      {/* Symbol */}
      <div className="die-symbol-container">
        {getDieSymbol(die)}
      </div>
    </motion.div>
  );
};

const DiceGroup = ({ dice, category }: { dice: DieResult[]; category: string }) => {
  if (dice.length === 0) return null;
  return (
    <div>
      <div className="text-[0.65rem] text-muted-foreground uppercase tracking-widest mb-1.5">
        {dieCategoryLabel[category as keyof typeof dieCategoryLabel]}
      </div>
      <div className="flex flex-wrap gap-2">
        {dice.map((die, i) => (
          <DieFace key={`${category}-${i}`} die={die} index={i} />
        ))}
      </div>
    </div>
  );
};

interface DiceResultsProps {
  roll: RollResult | null;
  isRolling: boolean;
}

const DiceResults = ({ roll, isRolling }: DiceResultsProps) => {
  if (!roll && !isRolling) {
    return (
      <div className="panel">
        <div className="panel-header">▸ Résultats</div>
        <div className="px-4 py-8 text-center text-muted-foreground text-sm">
          Configurez vos dés et lancez...
        </div>
      </div>
    );
  }

  return (
    <div className="panel">
      <div className="panel-header flex items-center justify-between">
        <span>▸ Résultats</span>
        {roll?.pushed && (
          <span className="text-danger text-[0.65rem] tracking-wider">JET POUSSÉ</span>
        )}
      </div>
      <div className="px-4 py-3 space-y-3">
        {isRolling ? (
          <div className="py-6 text-center toxic-glow text-lg font-display">
            LANCER EN COURS...
          </div>
        ) : roll && (
          <AnimatePresence mode="wait">
            <motion.div
              key={roll.timestamp}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <DiceGroup dice={roll.dice.filter(d => d.category === 'base')} category="base" />
              <DiceGroup dice={roll.dice.filter(d => d.category === 'skill')} category="skill" />
              <DiceGroup dice={roll.dice.filter(d => d.category === 'gear')} category="gear" />
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default DiceResults;
