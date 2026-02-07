import { useState } from "react";
import type { CharacterType } from "../components/character";

export function useCharacters() {
  const [characters, setCharacters] = useState<CharacterType[]>([]);
  const [activeTurnIndex, setActiveTurnIndex] = useState<number | null>(null);

  const addCharacter = () => {
    setCharacters((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: "New Character",
        initiative: 0,
        hp: 0,
        maxHp: 0,
        ac: 0,
      },
    ]);
  };

  const updateCharacter = (updated: CharacterType) => {
    setCharacters((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  const deleteCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((c) => c.id !== id));
    setActiveTurnIndex(null);
  };

  const clearAllCharacters = () => {
    if (confirm("Delete all characters?")) {
      setCharacters([]);
      setActiveTurnIndex(null);
    }
  };

  const startCombat = () => {
    if (characters.length > 0) setActiveTurnIndex(0);
  };

  const nextTurn = () => {
    if (activeTurnIndex === null) return;
    setActiveTurnIndex((prev) => (prev !== null ? (prev + 1) % characters.length : 0));
  };

  return {
    characters,
    activeTurnIndex,
    setCharacters,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    clearAllCharacters,
    startCombat,
    nextTurn,
  };
}