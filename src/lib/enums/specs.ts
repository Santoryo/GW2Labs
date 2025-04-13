import elementalist from '$lib/assets/classes/elementalist.png';
import guardian from '$lib/assets/classes/guardian.png';
import mesmer from '$lib/assets/classes/mesmer.png';
import necromancer from '$lib/assets/classes/necromancer.png';
import ranger from '$lib/assets/classes/ranger.png';
import revenant from '$lib/assets/classes/revenant.png';
import thief from '$lib/assets/classes/thief.png';
import warrior from '$lib/assets/classes/warrior.png';
import engineer from '$lib/assets/classes/engineer.png';

// renders
import guardianRender from '$lib/assets/class_specs_renders/guardian.webp';
import warriorRender from '$lib/assets/class_specs_renders/warrior.webp';
import engineerRender from '$lib/assets/class_specs_renders/engineer.webp';
import rangerRender from '$lib/assets/class_specs_renders/ranger.webp';
import thiefRender from '$lib/assets/class_specs_renders/thief.webp';
import elementalistRender from '$lib/assets/class_specs_renders/elementalist.webp';
import mesmerRender from '$lib/assets/class_specs_renders/mesmer.webp';
import necromancerRender from '$lib/assets/class_specs_renders/necromancer.webp';
import revenantRender from '$lib/assets/class_specs_renders/revenant.webp';

import dragonhunterRender from '$lib/assets/class_specs_renders/dragonhunter.webp';
import berserkerRender from '$lib/assets/class_specs_renders/berserker.webp';
import scrapperRender from '$lib/assets/class_specs_renders/scrapper.webp';
import druidRender from '$lib/assets/class_specs_renders/druid.webp';
import daredevilRender from '$lib/assets/class_specs_renders/daredevil.webp';
import tempestRender from '$lib/assets/class_specs_renders/tempest.webp';
import chronomancerRender from '$lib/assets/class_specs_renders/chronomancer.webp';
import reaperRender from '$lib/assets/class_specs_renders/reaper.webp';
import heraldRender from '$lib/assets/class_specs_renders/herald.webp';

import firebrandRender from '$lib/assets/class_specs_renders/firebrand.webp';
import spellbreakerRender from '$lib/assets/class_specs_renders/spellbreaker.webp';
import holosmithRender from '$lib/assets/class_specs_renders/holosmith.webp';
import soulbeastRender from '$lib/assets/class_specs_renders/soulbeast.webp';
import deadeyeRender from '$lib/assets/class_specs_renders/deadeye.webp';
import weaverRender from '$lib/assets/class_specs_renders/weaver.webp';
import mirageRender from '$lib/assets/class_specs_renders/mirage.webp';
import scourgeRender from '$lib/assets/class_specs_renders/scourge.webp';
import renegadeRender from '$lib/assets/class_specs_renders/renegade.webp';

import willbenderRender from '$lib/assets/class_specs_renders/willbender.webp';
import bladeswornRender from '$lib/assets/class_specs_renders/bladesworn.webp';
import mechanistRender from '$lib/assets/class_specs_renders/mechanist.webp';
import untamedRender from '$lib/assets/class_specs_renders/untamed.webp';
import specterRender from '$lib/assets/class_specs_renders/specter.webp';
import catalystRender from '$lib/assets/class_specs_renders/catalyst.webp';
import virtuosoRender from '$lib/assets/class_specs_renders/virtuoso.webp';
import harbingerRender from '$lib/assets/class_specs_renders/harbinger.webp';
import vindicatorRender from '$lib/assets/class_specs_renders/vindicator.webp';



export enum Classes {
    Guardian = 'Guardian',
    Warrior = 'Warrior',
    Engineer = 'Engineer',
    Ranger = 'Ranger',
    Thief = 'Thief',
    Elementalist = 'Elementalist',
    Mesmer = 'Mesmer',
    Necromancer = 'Necromancer',
    Revenant = 'Revenant'
}

export const ClassIcons = {
    Guardian: guardian,
    Warrior: warrior,
    Engineer: engineer,
    Ranger: ranger,
    Thief: thief,
    Elementalist: elementalist,
    Mesmer: mesmer,
    Necromancer: necromancer,
    Revenant: revenant
} as const;

export const ClassColors = {
    Guardian: '#00C9FF',
    Warrior: '#FFBD37',
    Engineer: '#FF9300',
    Ranger: '#C1FF00',
    Thief: '#FF6565',
    Elementalist: '#DC4E23',
    Mesmer: '#B86EDC',
    Necromancer: '#1FCA74',
    Revenant: '#D02A2A'
} as const;

export const ClassRenders = {
    guardian: guardianRender,
    warrior: warriorRender,
    engineer: engineerRender,
    ranger: rangerRender,
    thief: thiefRender,
    elementalist: elementalistRender,
    mesmer: mesmerRender,
    necromancer: necromancerRender,
    revenant: revenantRender,
    dragonhunter: dragonhunterRender,
    berserker: berserkerRender,
    scrapper: scrapperRender,
    druid: druidRender,
    daredevil: daredevilRender,
    tempest: tempestRender,
    chronomancer: chronomancerRender,
    reaper: reaperRender,
    herald: heraldRender,
    firebrand: firebrandRender,
    spellbreaker: spellbreakerRender,
    holosmith: holosmithRender,
    soulbeast: soulbeastRender,
    deadeye: deadeyeRender,
    weaver: weaverRender,
    mirage: mirageRender,
    scourge: scourgeRender,
    renegade: renegadeRender,
    willbender: willbenderRender,
    bladesworn: bladeswornRender,
    mechanist: mechanistRender,
    untamed: untamedRender,
    specter: specterRender,
    catalyst: catalystRender,
    virtuoso: virtuosoRender,
    harbinger: harbingerRender,
    vindicator: vindicatorRender,
  } as const;