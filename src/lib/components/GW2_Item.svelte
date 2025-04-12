<script lang="ts">
	import { getStatIcon } from '$lib/enums/stats';
	import itemstats from '$lib/assets/itemstats.json';
	import type { Equipment, ItemDetails, SkinDetails } from '$lib/interfaces/GW2Items';

	interface Props {
		itemsInfo: Record<any, ItemDetails>;
		equipment: Record<string, Equipment>;
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
</script>

<div
	class="relative flex w-full max-w-[290px] flex-row"
	class:h-[138px]={(item == 'WeaponA1' && !equipment['WeaponA2']) ||
		(item == 'WeaponB1' && !equipment['WeaponB2'])}
>
	{#if equipment[item] && itemsInfo[equipment[item].id]}
		<a
			href="https://wiki.guildwars2.com/wiki/?search={encodeURIComponent(
				itemsInfo[equipment[item].id].chat_link
			)}&ns0=1"
			target="_blank"
			class="flex flex-row items-start"
		>
			<img
				src={fashion && equipment[item].skin
					? skinsInfo[equipment[item].skin].icon
					: itemsInfo[equipment[item].id].icon}
				alt="Icon"
				class="mr-3 h-16 w-16 rounded-md"
			/>
			<div class="flex max-w-[235px] flex-col justify-start gap-0.5">
				<div
					class="text-bold overflow-hidden text-nowrap text-ellipsis {getRarityColor(
						itemsInfo[equipment[item].id].rarity
					)}"
				>
					{fashion && equipment[item].skin
						? skinsInfo[equipment[item].skin].name
						: itemsInfo[equipment[item].id].name}
				</div>
				<div class="flex flex-row gap-1 text-xs text-white/50">
					{#if equipment[item].stats}
						{itemstats[equipment[item].stats.id.toString() as keyof typeof itemstats].name}
					{/if}
					{#if itemsInfo[equipment[item].id].hasOwnProperty('details') && itemsInfo[equipment[item].id].details.infix_upgrade}
						{itemstats[
							String(
								itemsInfo[equipment[item].id].details.infix_upgrade.id
							) as keyof typeof itemstats
						].name}
					{/if}
					{#if itemsInfo[equipment[item].id].type == 'Weapon'}
						{itemsInfo[equipment[item].id].details.type.replace('Harpoon', 'Spear')}
					{:else}
						{item.replace(/[1-9]/g, '').replace('HelmAquatic', 'Aquatic Helm')}
					{/if}
					{#if equipment[item].stats && itemstats[equipment[item].stats.id.toString() as keyof typeof itemstats].name != 'Celestial'}
						{#each Object.entries(equipment[item].stats.attributes) as [attr, value]}
							<img src={getStatIcon(attr)} class="h-3" alt={attr} />
						{/each}
					{:else if itemsInfo[equipment[item].id].hasOwnProperty('details') && itemsInfo[equipment[item].id].details.infix_upgrade && itemstats[String(itemsInfo[equipment[item].id].details.infix_upgrade.id) as keyof typeof itemstats].name != 'Celestial'}
						{#each itemsInfo[equipment[item].id].details.infix_upgrade.attributes as attr}
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
			</div>
		</a>
	{:else if item != 'WeaponB2' && item != 'WeaponA2'}
		<div class="flex flex-row">
			<div class="mr-3 size-16 rounded-md bg-[#202020]"></div>
			<div class="flex max-w-[235px] flex-col gap-0.5 text-sm text-white/40">
				<div class="italic">{item.includes('Weapon') ? '' : 'Unequipped'}</div>
				<div class="flex flex-row gap-1 text-xs text-white/50">
					{item.includes('Weapon') ? 'Off-hand Weapon' : item.replace(/[1-9]/g, '')}
				</div>
			</div>
		</div>
	{:else}
		<div class="absolute bottom-2.5 left-0.5 flex flex-row items-center">
			<div class="mr-4.5 size-14 rounded-md bg-[#202020]"></div>
			<div class="flex max-w-[235px] flex-col gap-0.5 text-sm text-white/40">
				<div class="flex flex-row gap-1 text-xs text-white/50">
					{item.includes('Weapon') ? 'Off-hand Weapon' : item.replace(/[1-9]/g, '')}
				</div>
			</div>
		</div>
	{/if}
</div>
