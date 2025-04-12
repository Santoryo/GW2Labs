import type { ItemDetails, SkinDetails } from "$lib/interfaces/GW2Items";

export async function getItemsInfo(itemIds: number[]): Promise<Record<number, ItemDetails>> {
    const url = `https://api.guildwars2.com/v2/items?ids=${itemIds.join(',')}&lang=en`;
    console.log(`Fetching items from: ${url}`);
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
    console.log(`Fetching skins from: ${url}`);
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

