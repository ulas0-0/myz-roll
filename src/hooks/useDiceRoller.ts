import { useState, useCallback } from 'react';
import { DieResult, RollResult, DieCategory } from '@/types/dice';

const rollDie = (): number => Math.floor(Math.random() * 6) + 1;

const createDice = (count: number, category: DieCategory): DieResult[] =>
  Array.from({ length: count }, () => ({
    category,
    value: rollDie(),
  }));

const countSuccesses = (dice: DieResult[]): number =>
  dice.filter(d => d.value === 6).length;

const countDamage = (dice: DieResult[], category: DieCategory): number =>
  dice.filter(d => d.category === category && d.value === 1 && d.pushed).length;

export function useDiceRoller() {
  const [pools, setPools] = useState({ base: 3, skill: 2, gear: 1 });
  const [currentRoll, setCurrentRoll] = useState<RollResult | null>(null);
  const [history, setHistory] = useState<RollResult[]>([]);
  const [isRolling, setIsRolling] = useState(false);

  const setPool = useCallback((category: 'base' | 'skill' | 'gear', value: number) => {
    setPools(p => ({ ...p, [category]: Math.max(0, Math.min(10, value)) }));
  }, []);

  const roll = useCallback(() => {
    setIsRolling(true);
    setTimeout(() => {
      const dice = [
        ...createDice(pools.base, 'base'),
        ...createDice(pools.skill, 'skill'),
        ...createDice(pools.gear, 'gear'),
      ];
      const result: RollResult = {
        dice,
        successes: countSuccesses(dice),
        pushed: false,
        baseDamage: 0,
        gearDamage: 0,
        timestamp: Date.now(),
        pools: { ...pools },
      };
      setCurrentRoll(result);
      setHistory(h => [result, ...h].slice(0, 20));
      setIsRolling(false);
    }, 400);
  }, [pools]);

  const push = useCallback(() => {
    if (!currentRoll || currentRoll.pushed) return;
    setIsRolling(true);
    setTimeout(() => {
      const newDice = currentRoll.dice.map(die => {
        if (die.value === 6) return { ...die, locked: true };
        return {
          ...die,
          value: rollDie(),
          pushed: true,
        };
      });
      const result: RollResult = {
        dice: newDice,
        successes: countSuccesses(newDice),
        pushed: true,
        baseDamage: countDamage(newDice, 'base'),
        gearDamage: countDamage(newDice, 'gear'),
        timestamp: Date.now(),
        pools: currentRoll.pools,
      };
      setCurrentRoll(result);
      setHistory(h => [result, ...h].slice(0, 20));
      setIsRolling(false);
    }, 400);
  }, [currentRoll]);

  return { pools, setPool, currentRoll, history, isRolling, roll, push };
}
