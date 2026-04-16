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
      className="flex-1 py-4 px-6 btn-heavy btn-roll text-lg md:text-xl tracking-widest rounded-sm"
    >
      {isRolling ? '...' : `⚡ Lancer les dés (${totalDice})`}
    </motion.button>

    <motion.button
      whileTap={canPush ? { scale: 0.96 } : {}}
      onClick={onPush}
      disabled={!canPush || isRolling}
      className="sm:w-auto py-4 px-6 btn-heavy btn-push text-base md:text-lg tracking-widest rounded-sm"
    >
      ☠ Pousser le jet
    </motion.button>
  </div>
);

export default ActionButtons;
