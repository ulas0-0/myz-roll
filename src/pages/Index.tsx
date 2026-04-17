import AppHeader from '@/components/AppHeader';
import DicePoolConfig from '@/components/DicePoolConfig';
import ActionButtons from '@/components/ActionButtons';
import DiceResults from '@/components/DiceResults';
import ResultSummary from '@/components/ResultSummary';
import RollHistory from '@/components/RollHistory';
import { useDiceRoller } from '@/hooks/useDiceRoller';
import bgWasteland from '@/assets/bg-wasteland.jpg';

const Index = () => {
  const { pools, setPool, currentRoll, history, isRolling, roll, push } = useDiceRoller();
  const totalDice = pools.base + pools.skill + pools.gear;
  const canPush = !!currentRoll && !currentRoll.pushed && !isRolling;

  return (
    <div className="min-h-screen relative">
      {/* Background */}
      <div
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(https://cdn.pixabay.com/photo/2024/07/14/16/51/ai-generated-8894878_1280.jpg)` }}
      />
      <div className="fixed inset-0 z-0 bg-background/85" />

      <div className="relative z-10 max-w-2xl mx-auto noise-bg">
        <AppHeader />
        <main className="p-3 md:p-4 space-y-3 md:space-y-4">
          <DicePoolConfig pools={pools} onSetPool={setPool} />
          <ActionButtons
            onRoll={roll}
            onPush={push}
            canPush={canPush}
            isRolling={isRolling}
            totalDice={totalDice}
          />
          <DiceResults roll={currentRoll} isRolling={isRolling} />
          <ResultSummary roll={currentRoll} />
          <RollHistory history={history} />
        </main>
        <footer className="px-4 py-3 text-center text-[0.55rem] text-muted-foreground tracking-widest uppercase">
          Mutant: Année Zéro — Outil de jet de dés — Non officiel
        </footer>
      </div>
    </div>
  );
};

export default Index;
