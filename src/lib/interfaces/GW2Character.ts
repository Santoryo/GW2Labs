export interface Character {
    name: string
    race: string
    gender: string
    flags: any[]
    profession: string
    level: number
    guild: string
    age: number
    last_modified: string
    created: string
    deaths: number
    crafting: any[]
    title: number
    backstory: string[]
    wvw_abilities: any[]
    build_tabs_unlocked: number
    active_build_tab: number
    build_tabs: BuildTab[]
    equipment_tabs_unlocked: number
    active_equipment_tab: number
    equipment: Equipment[]
    equipment_tabs: EquipmentTab[]
    recipes: number[]
    training: any[]
    bags: Bag[]
    equipment_pvp: EquipmentPvp
  }
  
  export interface BuildTab {
    tab: number
    is_active: boolean
    build: Build
  }
  
  export interface Build {
    name: string
    profession: string
    specializations: Specialization[]
    skills: Skills
    aquatic_skills: AquaticSkills
  }
  
  export interface Specialization {
    id?: number
    traits?: number[]
  }
  
  export interface Skills {
    heal?: number
    utilities: number | undefined[]
    elite?: number
  }
  
  export interface AquaticSkills {
    heal?: number
    utilities: any[]
    elite: any
  }
  
  export interface Equipment {
    id: number
    slot?: string
    upgrades?: number[]
    binding: string
    bound_to?: string
    location: string
    tabs?: number[]
    stats?: Stats
    dyes?: number | undefined[]
    skin?: number
    infusions?: number[]
    count?: number
  }
  
  export interface Stats {
    id: number
    attributes: Attributes
  }
  
  export interface Attributes {
    Power?: number
    Precision?: number
    CritDamage?: number
    Vitality?: number
    Toughness?: number
    Healing?: number
    ConditionDamage?: number
    BoonDuration?: number
    ConditionDuration?: number
  }
  
  export interface EquipmentTab {
    tab: number
    name: string
    is_active: boolean
    equipment: Equipment2[]
  }
  
  export interface Equipment2 {
    id: number
    slot: string
    upgrades?: number[]
    binding: string
    bound_to?: string
    location: string
    skin?: number
    dyes?: number | undefined[]
    stats?: Stats2
  }
  
  export interface Stats2 {
    id: number
    attributes: Attributes2
  }
  
  export interface Attributes2 {
    Power: number
    Precision?: number
    CritDamage?: number
    Healing?: number
    BoonDuration?: number
  }
  
  export interface Bag {
    id: number
    size: number
    inventory: Inventory | undefined[]
  }
  
  export interface Inventory {
    id: number
    count: number
    binding?: string
    bound_to?: string
    upgrades?: number[]
    upgrade_slot_indices?: number[]
    dyes?: number[]
    charges?: number
  }
  
  export interface EquipmentPvp {
    amulet: any
    rune: any
    sigils: any[]
  }