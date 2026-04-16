import { motion } from 'framer-motion';

interface ActionButtonsProps {
  onRoll: () => void;
  onPush: () => void;
  canPush: boolean;
  isRolling: boolean;
  totalDice: number;
}

const ActionButtons = ({ onRoll, onPush, canPush, isRolling, totalDice }: ActionButtonsProps) => (
  <div className="flex flex-col sm:flex-row gap-3">
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onRoll}
      disabled={isRolling || totalDice === 0}
      className="flex-1 py-4 px-6 bg-toxic/90 text-primary-foreground font-display text-lg md:text-xl font-bold uppercase tracking-widest rounded-sm border-2 border-toxic-glow/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all hover:bg-toxic-glow/90 active:bg-toxic"
      style={{ boxShadow: '0 0 20px hsl(90 100% 35% / 0.2), inset 0 1px 0 hsl(90 100% 60% / 0.2)' }}
    >
      {isRolling ? '...' : `⚡ Lancer les dés (${totalDice})`}
    </motion.button>

    <motion.button
      whileTap={canPush ? { scale: 0.96 } : {}}
      onClick={onPush}
      disabled={!canPush || isRolling}
      className="sm:w-auto py-4 px-6 bg-danger/80 text-destructive-foreground font-display text-base md:text-lg font-bold uppercase tracking-widest rounded-sm border-2 border-danger/50 disabled:opacity-20 disabled:cursor-not-allowed transition-all hover:bg-danger active:bg-danger/70"
      style={canPush ? { boxShadow: '0 0 15px hsl(0 70% 45% / 0.3)' } : {}}
    >
      ☠ Pousser le jet
    </motion.button>
  </div>
);

export default ActionButtons;
