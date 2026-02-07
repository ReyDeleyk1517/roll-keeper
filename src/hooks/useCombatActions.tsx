import { useState, useEffect } from "react";
import type { CharacterType } from "../components/character";

export type ActionType = "attack" | "damage" | "heal" | null;
export type LogEntry = { id: string; message: string; action: Exclude<ActionType, null> };

export function useCombatActions(
  _characters: CharacterType[],
  setCharacters: React.Dispatch<React.SetStateAction<CharacterType[]>>
) {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [currentAction, setCurrentAction] = useState<ActionType>(null);
  const [lastAction, setLastAction] = useState<Exclude<ActionType, null> | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [showActionModal, setShowActionModal] = useState(false);

  const addLog = (message: string, action: Exclude<ActionType, null>) => {
    setLogs((prev) => [{ id: crypto.randomUUID(), message, action }, ...prev]);
  };

  useEffect(() => {
    if (actionMessage && lastAction) addLog(actionMessage, lastAction);
  }, [actionMessage, lastAction]);

  const handleHeal = (id: string, amount: number) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, hp: Math.min(c.maxHp, c.hp + amount) } : c))
    );
  };

  const handleDamage = (id: string, amount: number) => {
    setCharacters((prev) =>
      prev.map((c) => (c.id === id ? { ...c, hp: Math.max(0, c.hp - amount) } : c))
    );
  };

  return {
    logs,
    currentAction,
    setCurrentAction,
    lastAction,
    setLastAction,
    actionMessage,
    setActionMessage,
    showActionModal,
    setShowActionModal,
    handleHeal,
    handleDamage,
  };
}