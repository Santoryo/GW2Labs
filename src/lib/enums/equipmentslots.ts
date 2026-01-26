export enum EquipmentSlotsLeft {
    Helm = 'Helm',
    Shoulders = 'Shoulders',
    Coat = 'Coat',
    Gloves = 'Gloves',
    Leggings = 'Leggings',
    Boots = 'Boots',
}

export enum EquipmentWeapon {
    WeaponA1 = 'Main Hand Weapon',
    WeaponA2 = 'Off Hand Weapon',
    WeaponB1 = 'Main Hand Weapon',
    WeaponB2 = 'Off Hand Weapon',
}

export enum EquipmentAquatic {
    HelmAquatic = 'Aquatic Helm',
    WeaponAquaticA = 'Aquatic Weapon',
    WeaponAquaticB = 'Aquatic Weapon'
}

export enum EquipmentSlotsRight {
    Backpack = 'Backpack',
    Amulet = 'Amulet',
    Ring1 = 'Ring',
    Ring2 = 'Ring',
    Accessory1 = 'Accessory',
    Accessory2 = 'Accessory',
    Relic = 'Relic',
}

export const EquipmentSlots = {
...EquipmentSlotsLeft,
...EquipmentSlotsRight,
...EquipmentWeapon,
...EquipmentAquatic
}