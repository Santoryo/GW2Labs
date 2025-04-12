<script lang="ts">
	import Gw2Item from '$lib/components/GW2_Item.svelte';
	import { onMount } from 'svelte';
	import { getItemsInfo, getSkinsInfo } from '$lib/scripts/GW2Utils';
	import type { Equipment, ItemDetails, SkinDetails } from '$lib/interfaces/GW2Items';
	import type { Character } from '$lib/interfaces/GW2Character';

	let isReady = $state(false);
	let equipment: Record<string, Equipment> = $state({});
	let itemsId: number[] = $state([]);
	let itemsInfo: Record<any, ItemDetails> = $state({});
	let skinsId: number[] = $state([]);
	let skinsInfo: Record<any, SkinDetails> = $state({});
	let character: Character = $state({} as Character);

	let fashion = $state(true);

	let leftCol = [
		'Helm',
		'Shoulders',
		'Coat',
		'Gloves',
		'Leggings',
		'Boots',
		'WeaponA1',
		'WeaponA2',
		'WeaponB1',
		'WeaponB2'
	];
	let rightCol = ['Backpack', 'Amulet', 'Ring1', 'Ring2', 'Accessory1', 'Accessory2', 'Relic'];

	onMount(async () => {
		await loadData();

		setInterval(async () => {
			console.log('Reloading data...');
			await loadData();
		}, 60000);

		isReady = true;
	});

	async function loadData() {
		const data = await fetch('https://gw2.brelshaza.com/streamer/149905017');
		const json = await data.json();
		character = json;
		console.log(character);

		skinsId = [];
		itemsId = [];

		equipment = json.equipment.reduce((acc: Record<string, Equipment>, item: Equipment) => {
			const key = item.slot;
			if (!acc[key]) {
				acc[key] = {} as Equipment;
			}

			if (item.location != 'Equipped') return acc;

			itemsId.push(item.id);
			if (item.skin) {
				skinsId.push(item.skin);
			}

			(item.upgrades ?? []).forEach((upgrade) => {
				itemsId.push(upgrade);
			});

			acc[key] = item;
			return acc;
		}, {});

		itemsInfo = await getItemsInfo(itemsId);
		skinsInfo = await getSkinsInfo(skinsId);
		console.log(itemsInfo);
	}
</script>

<div class="flex h-[1080px] w-[1920px] flex-col justify-center">
	{#if isReady}
		<div
			class="relative my-auto ml-12 flex size-[860px] flex-col gap-4 overflow-hidden rounded-xl bg-[#09090A]/[99%] p-4 text-white"
			style="font-family: 'Overpass', sans-serif;"
		>
			<img
				src="https://gw2efficiency.com/assets/account/specialisations/{character.profession.toLowerCase()}.png"
				class="absolute bottom-[-100px] left-[-100px] z-1 w-[500px] opacity-10"
				alt="Background"
			/>

			<div class="relative z-10 flex w-full flex-row items-center justify-between">
				<div class="flex flex-col text-xl font-black">
					<div>{character.name}</div>
					<div class="text-sm font-semibold text-gray-400">
						Level {character.level}, {character.profession}
					</div>
				</div>
				<div>
					<label class="swap">
						<input
							type="checkbox"
							class="opacity-0"
							checked={fashion}
							onchange={() => (fashion = !fashion)}
						/>
						<div class="swap-on">FASHION</div>
						<div class="swap-off">GEAR</div>
					</label>
				</div>
			</div>
			<div class="relative z-10 flex flex-row justify-around gap-2">
				<div class="flex flex-col gap-2.5">
					{#each leftCol as item}
						<Gw2Item {item} {equipment} {itemsInfo} {skinsInfo} {fashion} />
					{/each}
				</div>
				<div class="flex flex-col gap-2.5">
					{#each rightCol as item}
						<Gw2Item {item} {equipment} {itemsInfo} {skinsInfo} {fashion} />
					{/each}
				</div>
			</div>
		</div>
	{/if}
</div>

<style>
</style>
