import type { Bag, BuildTab, Character, Equipment, EquipmentPvp, EquipmentTab } from "$lib/interfaces/GW2Character";

export class CharacterModel implements Character {
    name: string;
    race: string;
    gender: string;
    flags: any[];
    profession: string;
    level: number;
    guild: string;
    age: number;
    last_modified: string;
    created: string;
    deaths: number;
    crafting: any[];
    title: number;
    backstory: string[];
    wvw_abilities: any[];
    build_tabs_unlocked: number;
    active_build_tab: number;
    build_tabs: BuildTab[];
    equipment_tabs_unlocked: number;
    active_equipment_tab: number;
    equipment: Equipment[];
    equipment_tabs: EquipmentTab[];
    recipes: number[];
    training: any[];
    bags: Bag[];
    equipment_pvp: EquipmentPvp;

    

}