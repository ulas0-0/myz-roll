export type DieCategory = 'base' | 'skill' | 'gear';

export interface DieResult {
  category: DieCategory;
  value: number;
  locked?: boolean; // true if it was a 6 (success) - can't be pushed
  pushed?: boolean; // true if this die was rerolled on push
}

export interface RollResult {
  dice: DieResult[];
  successes: number;
  pushed: boolean;
  baseDamage: number;  // 1s on base dice after push
  gearDamage: number;  // 1s on gear dice after push
  timestamp: number;
  pools: { base: number; skill: number; gear: number };
}
