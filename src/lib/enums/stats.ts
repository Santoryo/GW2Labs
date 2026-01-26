import armor from '$lib/assets/stats/armor.png';
import power from '$lib/assets/stats/power.png';
import precision from '$lib/assets/stats/precision.png';
import toughness from '$lib/assets/stats/toughness.png';
import vitality from '$lib/assets/stats/vitality.png';
import conditionDamage from '$lib/assets/stats/condition.png';
import healingPower from '$lib/assets/stats/healingpower.png';
import ferocity from '$lib/assets/stats/ferocity.png';
import expertise from '$lib/assets/stats/expertise.png';
import concentration from '$lib/assets/stats/concentration.png';
import health from '$lib/assets/stats/health.png';
import criticalChance from '$lib/assets/stats/critical_chance.png';


export enum Stats {
    Power = 'Power', // Amount of Power given
    Precision = 'Precision', // Amount of Precision given
    Toughness = 'Toughness', // Amount of Toughness given
    Vitality = 'Vitality', // Amount of Vitality given
    ConditionDamage = 'Condition Damage', // Amount of Condition Damage given
    ConditionDuration = 'Condition Duration', // Amount of Condition Duration given
    Healing = 'Healing', // Amount of Healing Power given
    BoonDuration = 'Boon Duration', // Amount of Boon Duration given
    CritDamage = 'Ferocity'
}

export const statsIcons: { [key in Stats]: string } = {
    [Stats.Power]: power,
    [Stats.Precision]: precision,
    [Stats.Toughness]: toughness,
    [Stats.Vitality]: vitality,
    [Stats.ConditionDamage]: conditionDamage,
    [Stats.ConditionDuration]: armor,
    [Stats.Healing]: healingPower,
    [Stats.BoonDuration]: concentration,
    [Stats.CritDamage]: ferocity,
};


export function getStatIcon(statName: string): string | undefined {
    const statKey = Stats[statName as keyof typeof Stats]; // Convert string to Stats enum
    return statsIcons[statKey]; // Access the icon if it exists
}