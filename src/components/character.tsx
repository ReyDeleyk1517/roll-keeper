import { 
  Trash2, Shield, GripVertical, Sword, Heart
} from 'lucide-react'
import { useState } from 'react'

import { CONDITIONS } from './statusIcons' 
import { DEATHSAVES as DEATH_SAVE_DATA } from './statusIcons' 

export type CharacterType = {
  id: string
  name: string
  initiative: number
  hp: number
  maxHp: number
  ac: number
}

function Character({ character, onUpdate, onDelete, isActive }: {
  character: CharacterType,
  onUpdate: (c: CharacterType) => void,
  onDelete: (id: string) => void,
  isActive: boolean
}) {


  const hpPercentage = Math.min(Math.max((character.hp / (character.maxHp || 1)) * 100, 0), 100);
  const barColor = hpPercentage > 50 ? 'bg-emerald-400' : hpPercentage > 20 ? 'bg-yellow-400' : 'bg-red-500';

  const [activeConditions, setActiveConditions] = useState<String[]>([]);

  const [deathSaves, setDeathSaves] = useState<{
    success: number[]
    fail: number[]
  }>({
    success: [],
    fail: [],
  })

  function toggle(type: 'success' | 'fail', index: number) {
    setDeathSaves((prev) => {
      const exists = prev[type].includes(index)

      return {
        ...prev,
        [type]: exists
          ? prev[type].filter((i) => i !== index)
          : [...prev[type], index],
      }
    })
  }

  function toggleConditions(id:String){
    setActiveConditions(prev =>{
      if (prev.includes(id)) {
        return prev.filter(condition => condition !=id)
      }
      return [...prev,id]
    })
  }


  return (
    
<div className={`
      group relative flex items-center gap-6 p-4 pt-6 rounded-xl transition-all w-full
      ${isActive 
        ? 'bg-emerald-950/30 border-emerald-400 shadow-[0_0_20px_rgba(52,211,153,0.15)] ring-1 ring-emerald-400/50' 
        : 'bg-cyan-950/20 border-cyan-500/30 hover:border-cyan-400 hover:bg-cyan-900/30 shadow-[0_0_15px_rgba(6,182,212,0.05)]'}
      border
    `}>
      {/* Delete Button */}
      <button
        onClick={() => onDelete(character.id)}
        className="absolute top-2 right-2 p-1 text-cyan-900 hover:text-red-400 transition-all opacity-0 group-hover:opacity-100"
      >
        <Trash2 className="w-4 h-4" />
      </button>

      {/* Drag and Drop position */}
      <div className="cursor-grab active:cursor-grabbing text-cyan-800 group-hover:text-cyan-400 transition-colors">
        <GripVertical className="w-5 h-5" />
      </div>

      {/* Initiative */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-12 h-10 bg-black/40 rounded border border-cyan-500/20">
          <Sword className="w-7 h-7 text-cyan-500/10 absolute pointer-events-none" />
          <input
            type="number"
            className="relative bg-transparent text-base font-mono font-black text-cyan-400 w-full text-center focus:outline-none z-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={character.initiative}
            onChange={(e) => onUpdate({ ...character, initiative: Number(e.target.value) })}
          />
        </div>
        <span className="text-[9px] text-cyan-700 font-black uppercase tracking-wider mt-1">Initiative</span>
      </div>

      {/* Name and HP */}
      <div className="flex-1 flex flex-col gap-2">
        <input
          className="bg-transparent text-lg font-bold text-cyan-400 placeholder:text-cyan-900 focus:outline-none border-b border-transparent focus:border-cyan-400 transition-all uppercase tracking-tight"
          value={character.name}
          onChange={(e) => onUpdate({ ...character, name: e.target.value })}
          placeholder="Name"
        />
        <div className="flex items-center gap-4 w-full">
          <div className="flex items-center gap-1.5 shrink-0">
            <Heart className="w-3 h-3 text-cyan-400" />
            <span className="text-cyan-400 font-bold text-xs tracking-wider">HP</span>
          </div>
          <div className="flex-1 h-2 bg-black/50 rounded-full overflow-hidden border border-cyan-500/10">
            <div className={`h-full transition-all duration-700 ${barColor} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ width: `${hpPercentage}%` }} />
          </div>
          <div className="flex items-center gap-1 font-mono text-xs">
            <input
              type="number"
              className="bg-cyan-950/20 border border-cyan-500/30 w-12 text-center rounded text-cyan-100 focus:ring-1 focus:ring-cyan-400 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={character.hp}
              onChange={(e) => onUpdate({ ...character, hp: Number(e.target.value) })}
            />
            <span className="text-cyan-800 font-bold">/</span>
            <input
              type="number"
              className="bg-cyan-950/20 border border-cyan-500/30 w-12 text-center rounded text-cyan-600 focus:ring-1 focus:ring-cyan-400 focus:outline-none font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
              value={character.maxHp}
              onChange={(e) => onUpdate({ ...character, maxHp: Number(e.target.value) })}
            />
          </div>
        </div>
      </div>

      {/* AC */}
      <div className="flex flex-col items-center">
        <div className="relative flex items-center justify-center w-12 h-10 bg-black/40 rounded border border-cyan-500/20">
          <Shield className="w-7 h-7 text-cyan-500/10 absolute pointer-events-none" />
          <input
            type="number"
            className="relative bg-transparent text-base font-mono font-black text-cyan-400 w-full text-center focus:outline-none z-10 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            value={character.ac}
            onChange={(e) => onUpdate({ ...character, ac: Number(e.target.value) })}
          />
        </div>
        <span className="text-[9px] text-cyan-700 font-black uppercase tracking-wider mt-1">AC</span>
      </div>

      {/* Status Conditions */}
      <div className="flex flex-col items-center gap-1 min-w-20">
        <span className="text-[8px] text-cyan-600 font-black uppercase tracking-widest">conditions</span>
        
        {/* Cambiamos el contenedor de los iconos a Grid */}
        <div className="grid grid-cols-4 gap-1"> 
          {CONDITIONS.map((condition) => {
            const isActive = activeConditions.includes(condition.id);
            return (
              <div
                key={condition.id}
                title={condition.label}
                onClick={() => toggleConditions(condition.id)}
                className={`
                  w-5 h-5 rounded flex items-center justify-center cursor-pointer border transition-all
                  ${isActive 
                    ? `${condition.border} bg-black/20` 
                    : `border-gray-800 ${condition.hoverBorder}` 
                  }
                `}
              >
                <condition.icon
                  className={`
                    w-3.5 h-3.5 ${condition.color} transition-opacity
                    ${isActive ? 'opacity-100' : 'opacity-20 hover:opacity-100'}
                  `}
                />
              </div>
            )
          })}
        </div> 
      </div>

      {/* Death Saves */}
      <div className="flex flex-col items-center gap-1 min-w-20">
        <span className="text-[8px] text-cyan-600 font-black uppercase tracking-widest">Death Saves</span>
        <div className="flex flex-col gap-1">        
          {DEATH_SAVE_DATA.map((config) => {
            const type = config.id === 'success' ? 'success' : 'fail';
            const Icon = config.icon;
            return (
              <div key={config.id} className="flex gap-1">
                {[1, 2, 3].map((i) => {
                  const active = deathSaves[type].includes(i);
                  return (
                    <div
                      key={`${config.id}-${i}`}
                      onClick={() => toggle(type, i)}
                      className={`
                        w-4 h-4 rounded flex items-center justify-center cursor-pointer
                        border bg-black/20 transition-all
                        ${active 
                          ? config.border
                          : `border-gray-800 ${config.hoverBorder}`
                        }
                      `}
                    >
                      <Icon
                        className={`
                          w-2.5 h-2.5 transition-opacity ${config.color}
                          ${active ? 'opacity-100' : 'opacity-10 hover:opacity-100'}
                        `}
                      />
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

export default Character