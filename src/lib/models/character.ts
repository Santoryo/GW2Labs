import type { Bag, BuildTab, Character, Equipment, EquipmentPvp, EquipmentTab } from "$lib/interfaces/GW2Character";

export class CharacterModel implements Character {
    name: string = "";
    race: string = "";
    gender: string = "";
    flags: any[] = [];
    profession: string = "";
    level: number = 0;
    guild: string = "";
    age: number = 0;
    last_modified: string = "";
    created: string = "";
    deaths: number = 0;
    crafting: any[] = [];
    title: number = 0;
    backstory: string[] = [];
    wvw_abilities: any[] = [];
    build_tabs_unlocked: number = 0;
    active_build_tab: number = 0;
    build_tabs: BuildTab[] = [];
    equipment_tabs_unlocked: number = 0;
    active_equipment_tab: number = 0;
    equipment: Equipment[] = [];
    equipment_tabs: EquipmentTab[] = [];
    recipes: number[] = [];
    training: any[] = [];
    bags: Bag[] = [];
    equipment_pvp: EquipmentPvp;
    stats = {
        Power: 1000,
        Toughness: 1000,
        Vitality: 1000,
        Precision: 1000,
        Ferocity: 0,
        ConditionDamage: 0,
        Expertise: 0,
        Concentration: 0,
        Healing: 0,
    }

    constructor(init?: Partial<CharacterModel>) {
        Object.assign(this, init);
    }
}