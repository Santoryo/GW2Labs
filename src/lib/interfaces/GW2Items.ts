export interface Equipment {
	id: number;
	slot: string;
	upgrades?: number[];
	infusions?: number[];
	skin?: number;
	stats: Stats;
	binding: string;
	bound_to?: string;
	location: string;
	tabs: number[];
	dyes?: (number | null)[];
}

export interface Stats {
	id: number;
	attributes: Attributes;
}

export interface Attributes {
	Power?: number;
	Precision?: number;
	CritDamage?: number;
	Toughness?: number;
	Vitality?: number;
	ConditionDamage?: number;
	HealingPower?: number;
	Ferocity?: number;
	Expertise?: number;
	Concentration?: number;
	BoonDuration?: number;
	AttackDamage?: number;
	ConditionDuration?: number;
	CriticalChance?: number;
}

export interface ItemDetails {
	name: string;
	description: string;
	type: string;
	level: number;
	rarity: string;
	vendor_value: number;
	game_types: string[];
	flags: string[];
	restrictions: string[];
	id: number;
	chat_link: string;
	icon: string;
	details: any;
	infusion_upgrade_flags: string[];
	attribute_adjustment: number;
	infix_upgrade: InfixUpgrade;
	suffix: string;
}

export interface InfixUpgrade {
	id: number;
	attributes: Attribute[];
}

export interface Attribute {
	attribute: string;
	modifier: number;
}

export interface SkinDetails {
    name: string;
    type: string;
    flags: string[];
    restrictions: string[];
    rarity: string;
    id: number;
    icon: string;
    details: any;
}