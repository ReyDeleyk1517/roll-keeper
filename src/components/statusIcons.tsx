import { 
  Check, Skull,
  Zap, Anchor, Biohazard, HeartHandshake, Ghost, Activity,
  UserSearch, EyeClosed
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react';

export interface ConditionConfig {
  id: string;
  icon: LucideIcon;
  color: string;
  border: string;
  hoverBorder: string;
  label: string;
}

export interface deathSaveConfig {
  id: string;
  icon: LucideIcon;
  color: string;
  border: string;
  hoverBorder: string;
  label: string;
}

export const CONDITIONS: ConditionConfig[] = [
  { id: 'haste', icon: Zap, color: 'text-yellow-400', border: 'border-yellow-400/30', hoverBorder: 'hover:border-yellow-400', label: 'Haste' },
  { id: 'paralyzed', icon: Anchor, color: 'text-blue-400', border: 'border-blue-400/30', hoverBorder: 'hover:border-blue-400', label: 'Paralyzed' },
  { id: 'poisoned', icon: Biohazard, color: 'text-emerald-400', border: 'border-emerald-400/30', hoverBorder: 'hover:border-emerald-400', label: 'Poisoned' },
  { id: 'charmed', icon: HeartHandshake, color: 'text-pink-400', border: 'border-pink-400/30', hoverBorder: 'hover:border-pink-400', label: 'Charmed' },
  { id: 'frightened', icon: Ghost, color: 'text-purple-400', border: 'border-purple-400/30', hoverBorder: 'hover:border-purple-400', label: 'Frightened' },
  { id: 'stunned', icon: Activity, color: 'text-orange-500', border: 'border-orange-500/30', hoverBorder: 'hover:border-orange-500', label: 'Stunned' },
  { id: 'blinded', icon: EyeClosed, color: 'text-slate-400', border: 'border-slate-400/30', hoverBorder: 'hover:border-slate-400', label: 'Blinded' },
  { id: 'invisible', icon: UserSearch, color: 'text-cyan-300', border: 'border-cyan-300/30', hoverBorder: 'hover:border-cyan-300', label: 'Invisible' },
];

export const DEATHSAVES: deathSaveConfig[] = [
  { id: 'success', icon: Check, color: 'text-green-400', border: 'border-green-400/30', hoverBorder: 'hover:border-green-400', label: 'Sucess' },
  { id: 'failure', icon: Skull, color: 'text-red-400', border: 'border-red-400/30', hoverBorder: 'hover:border-red-400', label: 'Failure' },
];