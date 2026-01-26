<script lang="ts">
	import { getStatIcon } from '$lib/enums/stats';
	import itemstats from '$lib/constants/itemstats.json';
	import type { Equipment, ItemDetails, SkinDetails } from '$lib/interfaces/GW2Items';
	import colors from '$lib/constants/colors.json';
	import type { EquipmentDTO } from '$lib/interfaces/GW2Character';
	import { EquipmentSlots, EquipmentSlotsLeft, EquipmentSlotsRight } from '$lib/enums/equipmentslots';

	interface Props {
		itemsInfo: Record<any, ItemDetails>;
		equipment: Record<string, EquipmentDTO>;
		item: string;
		skinsInfo: Record<any, SkinDetails>;
		fashion: boolean;
	}

	let { itemsInfo, equipment, item, skinsInfo, fashion }: Props = $props();

	function getRarityColor(rarity: String) {
		switch (rarity) {
			case 'Ascended':
				return 'text-pink-500';
			case 'Legendary':
				return 'text-purple-500';
			case 'Exotic':
				return 'text-orange-500';
			case 'Rare':
				return 'text-blue-500';
			case 'Masterwork':
				return 'text-green-500';
			case 'Fine':
				return 'text-teal-500';
			case 'Basic':
				return 'text-gray-500';
			default:
				return 'text-white';
		}
	}

	function getItemIcon(): string {
	if (fashion && equipment[item]?.skinId && skinsInfo[equipment[item].skinId])
		return skinsInfo[equipment[item].skinId].icon;
	else if (equipment[item] && itemsInfo[equipment[item].itemId])
		return itemsInfo[equipment[item].itemId].icon;
	else
		return '';
	}

	function parseColor(dye: keyof typeof colors): string {
		console.log(dye);

		if(dye == null)
		{
			return 'rgb(0, 0, 0)';
		}
		const base_rgb = colors[`${dye}`].cloth.rgb;
		return `rgb(${base_rgb[0]}, ${base_rgb[1]}, ${base_rgb[2]})`;
	}
</script>

<div
	class="relative flex w-[290px] flex-row"
	class:h-[138px]={(item == 'WeaponA1' && !equipment['WeaponA2']) ||
		(item == 'WeaponB1' && !equipment['WeaponB2'])}
>
	{#if equipment[item] && itemsInfo[equipment[item].itemId]}
		<a
			href="https://wiki.guildwars2.com/wiki/?search={encodeURIComponent(
				itemsInfo[equipment[item].itemId].chat_link
			)}&ns0=1"
			target="_blank"
			class="flex flex-row items-start"
		>
			<img
			src={getItemIcon()}
				alt="Icon"
				class="mr-3 h-16 w-16 rounded-md"
			/>
			<div class="flex max-w-[235px] flex-col justify-start gap-0.5">
				<div
					class="text-bold overflow-hidden h-[21px] text-nowrap text-ellipsis {getRarityColor(
						itemsInfo[equipment[item].itemId].rarity
					)}"
				>
					{fashion && equipment[item].skinId
						? skinsInfo[equipment[item].skinId].name
						: itemsInfo[equipment[item].itemId].name}
				</div>
				<!-- {#if !fashion} -->
				<div class="flex flex-row gap-1 text-xs text-white/50">
					{#if equipment[item].statsId}
						{itemstats[equipment[item].statsId.toString() as keyof typeof itemstats].name}
					{/if}
					{#if itemsInfo[equipment[item].itemId].hasOwnProperty('details') && itemsInfo[equipment[item].itemId].details.infix_upgrade}
						{itemstats[
							String(
								itemsInfo[equipment[item].itemId].details.infix_upgrade.id
							) as keyof typeof itemstats
						].name}
					{/if}
					{#if itemsInfo[equipment[item].itemId].type == 'Weapon'}
						{itemsInfo[equipment[item].itemId].details.type.replace('Harpoon', 'Spear')}
					{:else}
						{EquipmentSlots[item]}
					{/if}
					{#if equipment[item].statsId && itemstats[equipment[item].statsId.toString() as keyof typeof itemstats].name != 'Celestial'}
						{#each Object.entries(itemstats[equipment[item].statsId].attributes) as [attr, value]}
							<img src={getStatIcon(value.attribute)} class="h-3" alt={value.attribute} />
						{/each}
					{:else if itemsInfo[equipment[item].itemId].hasOwnProperty('details') && itemsInfo[equipment[item].itemId].details.infix_upgrade && itemstats[String(itemsInfo[equipment[item].itemId].details.infix_upgrade.id) as keyof typeof itemstats].name != 'Celestial'}
						{#each itemsInfo[equipment[item].itemId].details.infix_upgrade.attributes as attr}
							<img src={getStatIcon(attr.attribute)} class="h-3" alt={attr.attribute} />
						{/each}
					{/if}
				</div>
				<div class="flex flex-col text-xs">
					{#each equipment[item].upgrades ?? [] as upgrade}
						<div class="flex flex-row items-center gap-2">
							<img src={itemsInfo[upgrade].icon} class="h-4" alt="Upgrade" />
							<div class="pt-0.5 text-xs">
								{itemsInfo[upgrade].name}
							</div>
						</div>
					{/each}
				</div>
				<!-- {:else if fashion && equipment[item].dyes}
					<div class="flex flex-row size-12 bg-black flex-wrap dye-box dye-count-{equipment[item].dyes.filter(dye => dye !== null).length}">
						{#each equipment[item].dyes.filter(dye => dye !== null) as dye}
						<div class="dye-slot" style="background-color: {parseColor(dye)}"></div>
						{/each}
					</div>
				{/if} -->
			</div>
		</a>
	{:else if item != 'WeaponB2' && item != 'WeaponA2'}
		<div class="flex flex-row items-center">
			<div class="mr-3 size-16 rounded-md bg-[#202020]"></div>
			<div class="flex max-w-[235px] flex-col gap-0.5 text-sm text-white/40">
				<div class="italic">{item.includes('Weapon') ? '' : 'Unequipped'}</div>
				<div class="flex flex-row gap-1 text-xs text-white/50">
					{item.includes('Weapon') ? 'Main Hand Weapon' : item.replace(/[1-9]/g, '')}
				</div>
			</div>
		</div>
	{:else}
		<div class="absolute bottom-2.5 left-0.5 flex flex-row items-center">
			<div class="mr-4.5 size-14 rounded-md bg-[#202020]"></div>
			<div class="flex max-w-[235px] flex-col gap-0.5 text-sm text-white/40">
				<div class="flex flex-row gap-1 text-xs text-white/50">
					{item.includes('Weapon') ? 'Off Hand Weapon' : item.replace(/[1-9]/g, '')}
				</div>
			</div>
		</div>
	{/if}
</div>


<style>
.dye-box {
  display: grid;
  width: 44px;
  height: 44px;
  background: #222;
  padding: 2px;
  gap: 2px;
  box-sizing: border-box;
}

.dye-slot {
  border: 1px solid #000;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
}

/* 2 dyes: 1 column, 2 rows */
.dye-box.dye-count-2 {
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;
}

/* 3 dyes: top row 1 column, bottom row 2 columns */
.dye-box.dye-count-3 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}

.dye-box.dye-count-3 .dye-slot:nth-child(1) {
  grid-column: 1 / 3; /* Top row, spans both columns */
}

.dye-box.dye-count-3 .dye-slot:nth-child(2) {
  grid-column: 1;
  grid-row: 2;
}

.dye-box.dye-count-3 .dye-slot:nth-child(3) {
  grid-column: 2;
  grid-row: 2;
}

/* 4 dyes: standard 2x2 grid */
.dye-box.dye-count-4 {
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
}
</style>