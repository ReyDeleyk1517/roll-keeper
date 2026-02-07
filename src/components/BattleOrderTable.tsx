import { useState } from "react";
import type { CharacterType } from "./character";
import Character from "./character";

type Props = {
  characters: CharacterType[];
  onUpdate: (c: CharacterType) => void;
  onDelete: (id: string) => void;
  onReorder: (chars: CharacterType[]) => void;
  activeTurnIndex: number | null; 
};

export default function BattleOrderTable({
  characters,
  onUpdate,
  onDelete,
  onReorder,
  activeTurnIndex, 
}: Props) {
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  function handleDragStart(index: number) {
    setDragIndex(index);
  }

  function handleDragOver(index: number) {
    if (dragIndex === null || dragIndex === index) return;

    const updated = [...characters];
    const [moved] = updated.splice(dragIndex, 1);
    updated.splice(index, 0, moved);

    setDragIndex(index);
    onReorder(updated);
  }

  const sortByInitiative = () => {
    const sorted = [...characters].sort((a, b) => b.initiative - a.initiative);
    onReorder(sorted);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      {/* sort button */}
      <div className="flex justify-start px-6 mt-4 mb-2">
        <button
          onClick={sortByInitiative}
          className="flex items-center gap-2 px-4 py-2 bg-cyan-950/40 border border-cyan-500/30 rounded-lg text-cyan-400 text-xs font-black uppercase tracking-widest hover:bg-cyan-500/20 hover:border-cyan-400 transition-all"
        >
          Sort
        </button>
      </div>

      {/* Container */}
      <div className="rounded-2xl p-6 w-full flex flex-col gap-4 max-h-96 overflow-y-auto">
        {characters.map((character, index) => (
          <div
            key={character.id}
            draggable
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => {
              e.preventDefault();
              handleDragOver(index);
            }}
          >
            <Character
              character={character}
              onUpdate={onUpdate}
              onDelete={onDelete}
              isActive={index === activeTurnIndex}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
