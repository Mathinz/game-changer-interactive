import { useEffect } from "react";
import create, { State } from "zustand";
import "./App.scss";

import Attribute from "./component/Attribute";
import Skill, { SkillLevel } from "./component/Skill";

import character from "./img/character/1.png";

interface BaseAttribute {
  strength: number;
  dexterity: number;
  mind: number;
  presence: number;
}

interface CombatAttribute {
  vitality: number;
  evasion: number;
  armor: number;
  alacrity: number;
  tenacity: number;
  power: number;
}

interface Skills {
  fighting: SkillLevel;
  thievery: SkillLevel;
  stealth: SkillLevel;
  archery: SkillLevel;
  learned: SkillLevel;
  survival: SkillLevel;
  perception: SkillLevel;
  apothecary: SkillLevel;
  intimidation: SkillLevel;
  performance: SkillLevel;
  manipulation: SkillLevel;
  insight: SkillLevel;
  power: SkillLevel;
}

interface User extends State {
  name: string;
  base: BaseAttribute;
  combat: CombatAttribute;
  skills: Skills;
  Setonly: (value: Partial<User>) => void;
  SetBaseAttribute: (value: Partial<BaseAttribute>) => void;
  SetCombatAttribute: (value: Partial<CombatAttribute>) => void;
  SetSkills: (value: Partial<Skills>) => void;
}

const imagesdemo = { untranined: "untranined", novice: "novice", apprentice: "apprentice", adept: "adept", expert: "expert", master: "master" };

export const useStore = create<User>((set) => ({
  name: "",
  base: {
    strength: 0,
    dexterity: 0,
    mind: 0,
    presence: 0
  },
  combat: {
    vitality: 0,
    evasion: 0,
    armor: 0,
    alacrity: 0,
    tenacity: 0,
    power: 0
  },
  skills: {
    fighting: SkillLevel.untranined,
    thievery: SkillLevel.untranined,
    stealth: SkillLevel.untranined,
    archery: SkillLevel.untranined,
    learned: SkillLevel.untranined,
    survival: SkillLevel.untranined,
    perception: SkillLevel.untranined,
    apothecary: SkillLevel.untranined,
    intimidation: SkillLevel.untranined,
    performance: SkillLevel.untranined,
    manipulation: SkillLevel.untranined,
    insight: SkillLevel.untranined,
    power: SkillLevel.untranined
  },
  Setonly: (value: Partial<User>) => set((state) => ({ ...state, value })),
  SetBaseAttribute: (value: Partial<BaseAttribute>) => set((state) => ({ ...state, base: { ...state.base, ...value } })),
  SetCombatAttribute: (value: Partial<CombatAttribute>) => set((state) => ({ ...state, combat: { ...state.combat, ...value } })),
  SetSkills: (value: Partial<Skills>) => set((state) => ({ ...state, skills: { ...state.skills, ...value } }))
}));

function GetSkillLevel(value: number, total: number) {
  const percent = (100 * value) / total;
  if (percent > 80) return SkillLevel.master;
  if (percent > 60) return SkillLevel.expert;
  if (percent > 40) return SkillLevel.adept;
  if (percent > 20) return SkillLevel.apprentice;
  if (percent > 0) return SkillLevel.novice;
  else return SkillLevel.untranined;
}

function App() {
  const state = useStore((state) => state);
  const SetBaseAttribute = useStore((state) => state.SetBaseAttribute);
  const SetCombatAttribute = useStore((state) => state.SetCombatAttribute);
  const SetSkills = useStore((state) => state.SetSkills);
  const baseAttribute = useStore((state) => state.base);
  const combatAttribute = useStore((state) => state.combat);

  useEffect(() => {
    console.log("here", baseAttribute, combatAttribute);
  }, [baseAttribute, combatAttribute]);

  useEffect(() => SetCombatAttribute({ vitality: 3 + baseAttribute.strength }), [SetCombatAttribute, baseAttribute.strength]);
  useEffect(() => SetCombatAttribute({ evasion: 10 + baseAttribute.dexterity }), [SetCombatAttribute, baseAttribute.dexterity]);
  useEffect(() => SetCombatAttribute({ armor: combatAttribute.evasion }), [SetCombatAttribute, combatAttribute.evasion]);
  useEffect(() => SetCombatAttribute({ alacrity: baseAttribute.dexterity + baseAttribute.mind }), [SetCombatAttribute, baseAttribute.dexterity, baseAttribute.mind]);
  useEffect(() => SetCombatAttribute({ tenacity: 1 + baseAttribute.presence }), [SetCombatAttribute, baseAttribute.presence]);

  useEffect(() => SetSkills({ fighting: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ thievery: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ stealth: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ archery: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ learned: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ survival: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ perception: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ apothecary: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ intimidation: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ performance: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ manipulation: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ insight: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);
  useEffect(() => SetSkills({ power: SkillLevel.adept }), [SetSkills, baseAttribute.strength]);

  function exportdata() {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(state)], { type: "text/plain;charset=utf-8" });
    element.href = URL.createObjectURL(file);
    element.download = "data.json";
    document.body.appendChild(element);
    element.click();
  }

  function importdata(value: FileList | null) {
    console.log(value); // file

    // useStore.setState(JSON.parse(value));
  }

  return (
    <div className="h-100 h-min-100vh lyt-main">
      <div className="grid has-no-gap container h-100 h-min-100vh">
        <div className="column flex is-y align-middle justify-center">
          <section className="txt-center w-24 mb-10">
            <input
              placeholder="Name"
              className="input clr-black"
              type="text"
              onChange={(e) =>
                useStore.setState((state) => {
                  return { ...state, name: e.target.value };
                })
              }
            />
          </section>
          <section className="txt-center w-24 mb-10">
            <div className="control inline-block">
              <input className="file" id="file" type="file" onChange={(e) => importdata(e.target.files)} />
              <label className="label btn is-sld is-primary" htmlFor="file">
                Import
              </label>
            </div>
            <button className="btn is-sld mx-2" onClick={() => exportdata()}>
              Expert
            </button>
          </section>
          <div className="grid w-24">
            <section className="column txt-center">
              <h4>Role</h4>
              <div className="flex justify-center">
                <div className="flex align-middle justify-center bg-warn clr-black" style={{ height: "150px", width: "150px" }}>
                  img
                </div>
              </div>
            </section>
            <section className="column txt-left">
              <Attribute onchange={(value) => SetBaseAttribute({ strength: value })} name="Strength" initialvalue={baseAttribute.strength} total={10} />
              <Attribute onchange={(value) => SetBaseAttribute({ dexterity: value })} name="Dexterity" initialvalue={baseAttribute.dexterity} total={10} />
              <Attribute onchange={(value) => SetBaseAttribute({ mind: value })} name="Mind" initialvalue={baseAttribute.mind} total={10} />
              <Attribute onchange={(value) => SetBaseAttribute({ presence: value })} name="Presence" initialvalue={baseAttribute.presence} total={10} />
            </section>
          </div>
        </div>

        <div className="column align-self-middle">
          <img src={character} className="img" alt="character" />
        </div>
        <div className="column flex is-y justify-center">
          <section>
            <div>Combat Attributes</div>
            <div className="grid">
              <div className="column w-24">
                <Attribute name="vitality" options={{ hidebutton: true }} initialvalue={combatAttribute.vitality} total={13} />
              </div>
              <div className="column w-24">
                <Attribute name="evasion" options={{ hidebutton: true }} initialvalue={combatAttribute.evasion} total={20} />
              </div>
              <div className="column w-24">
                <Attribute name="armor" options={{ hidebutton: true }} initialvalue={combatAttribute.armor} total={20} />
              </div>
              <div className="column w-24">
                <Attribute name="alacrity" options={{ hidebutton: true }} initialvalue={combatAttribute.alacrity} total={20} />
              </div>
              <div className="col umn w-24">
                <Attribute name="tenacity" options={{ hidebutton: true }} initialvalue={combatAttribute.tenacity} total={10} />
              </div>
              <div className="col umn w-24">
                <Attribute name="power" options={{ hidebutton: true }} initialvalue={combatAttribute.power} total={10} />
              </div>
            </div>
          </section>

          <section>
            <div>Skill</div>

            <div className="grid">
              <div className="column w-6">
                <Skill images={imagesdemo} name="fighting" level={GetSkillLevel(baseAttribute.strength + baseAttribute.dexterity, 20)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="thievery" level={GetSkillLevel(baseAttribute.dexterity, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="stealth" level={GetSkillLevel(baseAttribute.dexterity, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="archery" level={GetSkillLevel(baseAttribute.dexterity, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="learned" level={GetSkillLevel(baseAttribute.mind, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="survival" level={GetSkillLevel(baseAttribute.mind, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="perception" level={GetSkillLevel(baseAttribute.mind, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="apothecary" level={GetSkillLevel(baseAttribute.mind, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="intimidation" level={GetSkillLevel(baseAttribute.presence, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="performance" level={GetSkillLevel(baseAttribute.presence, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="manipulation" level={GetSkillLevel(baseAttribute.presence, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="insight" level={GetSkillLevel(baseAttribute.presence, 10)} />
              </div>
              <div className="column w-6">
                <Skill images={imagesdemo} name="power" level={GetSkillLevel(baseAttribute.presence, 10)} />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

export default App;
