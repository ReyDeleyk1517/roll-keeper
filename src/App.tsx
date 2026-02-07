import { useState } from "react";
import {
  Plus,
  Trash2,
  Shield,
  Zap,
  ListOrdered,
  Users,
  Swords,
  ChevronRight,
} from "lucide-react";
import BattleOrderTable from "./components/BattleOrderTable";
import DiceActionModal from "./components/diceActionModal";
import ActionTakedModal from "./components/actionTakedModal";


import { useCharacters } from "./hooks/useCharacters";
import { useCombatActions } from "./hooks/useCombatActions";

const ACTION_CONFIG = {
  attack: { title: "Attack Roll", accent: "red" },
  damage: { title: "Damage Roll", accent: "red" },
  heal: { title: "Heal Roll", accent: "green" },
} as const;

const actionColor = {
  attack: "text-red-400",
  damage: "text-red-300",
  heal: "text-emerald-400",
};

function App() {
  //hooks
  const {
    characters,
    activeTurnIndex,
    addCharacter,
    updateCharacter,
    deleteCharacter,
    clearAllCharacters,
    startCombat,
    nextTurn,
    setCharacters,
  } = useCharacters();

  
  const {
    logs,
    currentAction,
    setCurrentAction,
    lastAction,
    setLastAction,
    actionMessage,
    setActionMessage,
    showActionModal,
    setShowActionModal,
    handleDamage,
    handleHeal,
  } = useCombatActions(characters, setCharacters);

  
  const [selectedCharacterId, setSelectedCharacterId] = useState<string | null>(null);
  const selectedCharacter = characters.find((c) => c.id === selectedCharacterId);

  
  const handleResolveAction = (value: number) => {
    if (!selectedCharacter) return;

    const name = selectedCharacter.name;
    const AC = selectedCharacter.ac;

    if (currentAction === "attack") {
      if (value >= AC) {
        setLastAction("attack");
        setActionMessage(`Attack ${value} vs AC ${AC} on ${name} → HIT`);
        setShowActionModal(true);
        setCurrentAction("damage"); 
      } else {
        setActionMessage(`Attack ${value} vs AC ${AC} on ${name} → MISS`);
        setShowActionModal(true);
        setCurrentAction(null);
      }
    } else if (currentAction === "damage") {
      handleDamage(selectedCharacter.id, value);
      setLastAction("damage");
      setActionMessage(`${name} lost ${value} HP`);
      setShowActionModal(true);
      setCurrentAction(null);
    } else if (currentAction === "heal") {
      handleHeal(selectedCharacter.id, value);
      setLastAction("heal");
      setActionMessage(`${name} healed ${value} HP`);
      setShowActionModal(true);
      setCurrentAction(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans selection:bg-yellow-500/30">
      <header className="mt-16 mb-12 text-center">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-tight">Roll Keeper</h1>
        <p className="text-zinc-500 text-xs uppercase tracking-[0.2em] mt-2">
          Tabletop rpg turn order manager
        </p>
      </header>

      <main className="flex flex-1 w-full px-12 pb-12 gap-12 max-w-7xl mx-auto">
        {/* LEFT COLUMN */}
        <section className="flex-[1.2] flex flex-col gap-6">
          <header className="flex justify-between items-end border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-medium flex items-center gap-2">
              <Users className="w-5 h-5 text-zinc-400" /> Characters in combat
            </h2>
            {characters.length > 0 && (
              <button
                onClick={clearAllCharacters}
                className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 transition-colors mb-1"
              >
                <Trash2 className="w-3 h-3" /> Clean all
              </button>
            )}
          </header>


          {/* CHARACTERs TABLE */}
          <div className="flex flex-col gap-6">
            {characters.length === 0 ? (
              <div
                onClick={addCharacter}
                className="group border-2 border-dashed border-zinc-800 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-yellow-500/50 hover:bg-yellow-500/5 transition-all cursor-pointer"
              >
                <div className="bg-zinc-900 p-4 rounded-full group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-zinc-500 group-hover:text-yellow-400" />
                </div>
                <p className="text-zinc-500 text-sm font-medium">Click here to add a character</p>
              </div>
            ) : (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                  <BattleOrderTable
                    characters={characters}
                    onUpdate={updateCharacter}
                    onDelete={deleteCharacter}
                    onReorder={(updated) => setCharacters(updated)}
                    activeTurnIndex={activeTurnIndex}
                  />
                </div>
                <button
                  onClick={addCharacter}
                  className="mt-6 flex items-center justify-center gap-2 w-full py-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-300 transition-all font-bold text-sm uppercase tracking-widest"
                >
                  <Plus className="w-4 h-4" /> Add character
                </button>
              </div>
            )}
          </div>
        </section>

        <div className="w-px bg-zinc-800 self-stretch" />

        {/* RIGHT COLUMN */}
        <section className="flex-1 flex flex-col gap-6 max-w-md">
          <header className="w-full border-b border-zinc-800 pb-2">
            <h2 className="text-xl font-medium text-center">Action dashboard</h2>
          </header>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-500 mb-1">
                <ListOrdered className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-tighter">Participants</span>
              </div>
              <p className="text-2xl font-mono text-yellow-400">{characters.length}</p>
            </div>
            <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800">
              <div className="flex items-center gap-2 text-zinc-500 mb-1">
                <Zap className="w-4 h-4" />
                <span className="text-[10px] uppercase font-bold tracking-tighter">Max Initiative</span>
              </div>
              <p className="text-2xl font-mono text-white">
                {characters.length > 0 ? Math.max(...characters.map((c) => c.initiative)) : 0}
              </p>
            </div>
          </div>

          <div className="flex gap-2">
            {activeTurnIndex === null ? (
              <button
                onClick={startCombat}
                disabled={characters.length === 0}
                className="flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 text-[10px] font-black uppercase tracking-widest hover:bg-emerald-500/20 disabled:opacity-50 transition-all"
              >
                <Swords className="w-3.5 h-3.5" /> Start Combat
              </button>
            ) : (
              <button
                onClick={nextTurn}
                className="flex items-center gap-2 px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded text-cyan-400 text-[10px] font-black uppercase tracking-widest hover:bg-cyan-500/20 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.2)]"
              >
                Next Turn <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* CHARACTER ACTION SELECTOR */}
          <div className="flex flex-col gap-1">
            <label className="text-[10px] uppercase font-bold tracking-widest text-zinc-500">
              Select target
            </label>
            <select
              value={selectedCharacterId ?? ""}
              disabled={activeTurnIndex === null}
              onChange={(e) => setSelectedCharacterId(e.target.value)}
              className="bg-zinc-900 border border-zinc-700 rounded-md px-2 py-1 text-xs text-zinc-300 focus:ring-1 focus:ring-yellow-500/50 disabled:opacity-40"
            >
              <option value="" disabled>-- Select character --</option>
              {characters.map((c) => (
                <option key={c.id} value={c.id}>[{c.initiative}] {c.name}</option>
              ))}
            </select>
            <div className="flex gap-2 mt-2">
              <button
                disabled={!selectedCharacterId}
                onClick={() => setCurrentAction("attack")}
                className="flex-1 px-2 py-1 text-[10px] uppercase font-black tracking-widest bg-red-500/10 border border-red-500/20 rounded text-red-400 hover:bg-red-500/20 disabled:opacity-40"
              >
                Attack
              </button>
              <button
                disabled={!selectedCharacterId}
                onClick={() => setCurrentAction("heal")}
                className="flex-1 px-2 py-1 text-[10px] uppercase font-black tracking-widest bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-400 hover:bg-emerald-500/20 disabled:opacity-40"
              >
                Heal
              </button>
            </div>
          </div>

          {/* LOGS PANEL */}
          <div className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-4 flex-1 shadow-inner relative overflow-hidden">
            <div className="absolute top-3 right-3">
              <div className={`w-2 h-2 rounded-full animate-pulse ${activeTurnIndex !== null ? "bg-emerald-500" : "bg-yellow-500"}`} />
            </div>
            <h3 className="text-zinc-500 font-mono text-[10px] uppercase mb-4 border-b border-zinc-900 pb-2">Combat Logs</h3>
            <div className="font-mono text-[11px] space-y-2 text-zinc-400 overflow-y-auto max-h-75">
              {logs.length === 0 ? (
                <div className="opacity-20 italic">No actions yet...</div>
              ) : (
                logs.map((log) => (
                  <div key={log.id} className={`border-l pl-2 ${actionColor[log.action]}`}>
                    {log.message}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* STATUS FOOTER */}
          <div className={`p-4 rounded-xl border transition-all flex items-center gap-4 ${activeTurnIndex !== null ? "bg-emerald-900/20 border-emerald-500/30" : "bg-zinc-900/50 border-zinc-800"}`}>
            <div className={`p-2 rounded-lg ${activeTurnIndex !== null ? "bg-emerald-500/20" : "bg-yellow-500/10"}`}>
              <Shield className={`w-5 h-5 ${activeTurnIndex !== null ? "text-emerald-500" : "text-yellow-500"}`} />
            </div>
            <div>
              <p className="text-[10px] uppercase text-zinc-500 font-bold">Current status</p>
              <p className="text-xs text-zinc-300">{activeTurnIndex !== null ? "In combat" : "Preparing"}</p>
            </div>
          </div>
        </section>
      </main>

      {/* MODALS */}
      {currentAction && (
        <DiceActionModal
          open={true}
          title={ACTION_CONFIG[currentAction].title}
          accent={ACTION_CONFIG[currentAction].accent}
          onCancel={() => setCurrentAction(null)}
          onConfirm={handleResolveAction}
        />
      )}

      <ActionTakedModal
        open={showActionModal}
        title={lastAction ? ACTION_CONFIG[lastAction].title : ""}
        accent={lastAction ? ACTION_CONFIG[lastAction].accent : "red"}
        message={actionMessage ?? ""}
        onCancel={() => setShowActionModal(false)}
      />
    </div>
  );
}

export default App;