import type { BuildTab, Character, Skills } from "$lib/interfaces/GW2Character";
import type { ItemDetails, SkinDetails } from "$lib/interfaces/GW2Items";
import specs from "$lib/constants/specs.json";
import { ClassIcons } from "$lib/enums/specs";
import type { CharacterSkills, Skill } from "$lib/interfaces/GW2Build";

export async function getItemsInfo(itemIds: number[]): Promise<Record<number, ItemDetails>> {
    const url = `https://api.guildwars2.com/v2/items?ids=${itemIds.join(',')}&lang=en`;
    const results = await fetch(url);
    if (!results.ok) {
        throw new Error(`Error fetching items: ${results.statusText}`);
    }
    const data = await results.json();

    const itemsById = data.reduce((acc: { [key: number]: any }, item: any) => {
        acc[item.id] = item;
        return acc;
    }, {});


    return itemsById;
}

export async function getSkinsInfo(skinIds: number[]): Promise<Record<number, SkinDetails>> {
    const url = `https://api.guildwars2.com/v2/skins?ids=${skinIds.join(',')}&lang=en`;
    const results = await fetch(url);
    if (!results.ok) {
        throw new Error(`Error fetching skins: ${results.statusText}`);
    }
    const data = await results.json();
    const skinsById = data.reduce((acc: { [key: number]: any }, skin: any) => {
        acc[skin.id] = skin;
        return acc;
    }, {});
    return skinsById;
}

export function parseTitle(input: string): string {
    return input.replace(/<c=#[0-9a-fA-F]{6}>(.*?)<\/c>/g, (match, text) => {
      const colorMatch = match.match(/#([0-9a-fA-F]{6})/);
      const color = colorMatch ? colorMatch[0] : '';
      return `<span style="color: ${color}" class="font-semibold">${text}</span>`;
    });
}

export function getSpecIdFromBuild(spec: BuildTab): string | null {
    const specId = spec.build.specializations[2].id;
    if (specId === null)
    {
        return null;
    }
    if (specId === undefined || !specs.hasOwnProperty(specId))
    {
        return null;
    }

    return specId.toString();
}

export async function getCharacterTitle(titleId: number): Promise<string> {
    const url = `https://api.guildwars2.com/v2/titles/${titleId}?lang=en`;
    const results = await fetch(url);
    if (!results.ok) {
        return '';
    }
    const data = await results.json();
    return data.name;
}

export async function getBuildInfo(character: Character)
{
    const specIds = character.specialization.map((spec) => spec.specId);
    let traitIds = [];
    let activeTraits = [];

    for(let spec of character.specialization)
    {
        if(spec.traits)
        {
            activeTraits.push(...spec.traits);
        }
    }


    const specResults = await fetch(`https://api.guildwars2.com/v2/specializations?ids=${specIds.join(',')}&lang=en`);
    if (!specResults.ok) {
        throw new Error(`Error fetching specializations: ${specResults.statusText}`);
    }
    const specData = await specResults.json();
 
    for(let spec of specData)
    {
        traitIds.push(...spec.minor_traits);
        traitIds.push(...spec.major_traits);
        if(spec.weapon_trait)
        {
            traitIds.push(spec.weapon_trait);
        }
    }

    const traitsResults = await fetch(`https://api.guildwars2.com/v2/traits?ids=${traitIds.join(',')}&lang=en`);
    if (!traitsResults.ok) {
        throw new Error(`Error fetching traits: ${traitsResults.statusText}`);
    }
    const traitsData = await traitsResults.json();

    const traitsById = traitsData.reduce((acc: { [key: number]: any }, trait: any) => {
        acc[trait.id] = trait;
        return acc;
    }, {});

    for(let spec of specData)
    {
        spec.minor_traits = spec.minor_traits.map((traitId: number) => {
            const trait = traitsById[traitId];
            return {
                id: trait.id,
                name: trait.name,
                description: trait.description,
                icon: trait.icon
            };
        });

        spec.major_traits = spec.major_traits.map((traitId: number) => {
            const trait = traitsById[traitId];
            
            return {
                id: trait.id,
                name: trait.name,
                description: trait.description,
                icon: trait.icon,
                active: activeTraits.includes(traitId)
            };
        });

        if(spec.elite && spec.weapon_trait)
        {
            spec.weapon_trait = spec.weapon_trait ? traitsById[spec.weapon_trait] : null;
            spec.weapon_trait = {
                id: spec.weapon_trait.id,
                name: spec.weapon_trait.name,
                description: spec.weapon_trait.description,
                icon: spec.weapon_trait.icon
            };
        }
    }

    const buildInfo = {
        profession: character.profession,
        specializations: specData,
        skills: character.skills,
        aquatic_skills: character.skills
    };
    return buildInfo;

}

export async function getCharacterSkills(character: Character): Promise<Skill[]>
{
    const buildTab = character.skills;
    const skillIds = [
        buildTab.heal, ...buildTab.utilities, buildTab.elite
    ];

    const skillsResults = await fetch(`https://api.guildwars2.com/v2/skills?ids=${skillIds.join(',')}&lang=en`);
    if (!skillsResults.ok) {
        throw new Error(`Error fetching skills: ${skillsResults.statusText}`);
    }
    const skillsData = await skillsResults.json();
    // const skillsById = skillsData.reduce((acc: { [key: number]: any }, skill: any) => {
    //     acc[skill.id] = skill;
    //     return acc;
    // }, {});
    // const skills = {
    //     heal: skillsById[buildTab.build.skills.heal],
    //     utilities: buildTab.build.skills.utilities.map((skillId: number) => skillsById[skillId]),
    //     elite: skillsById[buildTab.build.skills.elite]
    // };
    return skillsData;
}