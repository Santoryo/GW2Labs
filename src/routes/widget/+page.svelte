<script lang="ts">
	import Gw2Item from '$lib/components/GW2_Item.svelte';
	import { onMount, tick } from 'svelte';
	import { getBuildInfo, getCharacterClass, getCharacterIcon, getCharacterSkills, getCharacterTitle, getItemsInfo, getSkinsInfo, parseTitle } from '$lib/scripts/GW2Utils';
	import type { Equipment, ItemDetails, SkinDetails } from '$lib/interfaces/GW2Items';
	import type { Character, Specialization } from '$lib/interfaces/GW2Character';
	import { ClassColors, ClassRenders } from '$lib/enums/specs';
	import type { CharacterBuild, CharacterSkills, Skill } from '$lib/interfaces/GW2Build';
	import Gw2Specialization from '$lib/components/GW2_Specialization.svelte';
	import arrow from '$lib/assets/other/arrow.svg';
	import skillsBg from '$lib/assets/other/skills.jpg';
	import Gw2Skill from '$lib/components/GW2_Skill.svelte';
	import { scaleState } from '$lib/store/scale.svelte';
	import { page } from '$app/state';

	let isReady = $state(false);
	let equipment: Record<string, Equipment> = $state({});
	let itemsId: number[] = $state([]);
	let itemsInfo: Record<any, ItemDetails> = $state({});
	let skinsId: number[] = $state([]);
	let skinsInfo: Record<any, SkinDetails> = $state({});
	let character: Character = $state({} as Character);
	let build: CharacterBuild = $state({} as CharacterBuild);
	let channelId: number | null = $state(149905017);
	let isOpen: boolean = $state(false);
	let skills: Skill[] = $state({} as Skill[]);

	let title: string = $state('');

	let fashion = $state(false);

	let activeTab = $state('gear');

	let widget: HTMLElement | null = $state(null);


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
	window.addEventListener('resize', () => {
			scaleWidget();
	});

	if(window.Twitch && window.Twitch.ext)
	{

		window.Twitch.ext.onAuthorized((auth) => {
			console.log('Twitch authorized');
			channelId = auth.channelId;
		});
	}
	else
	{
		page.url.searchParams.has('channelId') ? channelId = parseInt(page.url.searchParams.get('channelId') ?? '') : channelId = null;
		if(!channelId)
		{
			console.log('No channelId provided');
			return;
		}
		console.log('Twitch not authorized');
	}

		await loadData();

		setInterval(async () => {
			await loadData();
		}, 120000);

		isReady = true;
		await tick();
		setTimeout(() => {
			scaleWidget();
		}, 1000);
	});

	function scaleWidget() {
		const maxParentHeight = 1080;

		const scaleFactor = window.innerHeight / maxParentHeight;
		scaleState.scale = scaleFactor;
	}

	async function loadData() {
		if(!channelId) return;
		const data = await fetch(`https://gw2.brelshaza.com/streamer/${channelId}`);
		const json = await data.json();
		character = json;

		if(character.message)
		{
			console.log(character.message);
			return;
		}

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
		build = await getBuildInfo(character);
		title = await getCharacterTitle(character.title);
		skills = await getCharacterSkills(character);
	}
</script>

<div class="flex w-[1920px] h-screen flex-col justify-center">
	{#if isReady}
	{#if isOpen}
	{#key character}
	<div class="p-0.5 py-[2px] w-fit h-fit rounded-xl ml-2 transform-gpu origin-left"
		style="background-image: linear-gradient(to bottom, {ClassColors[character.profession as keyof typeof ClassColors]}, transparent); transform: scale({scaleState.scale});"
		bind:this={widget}
	>
		<div
			class="relative my-auto flex size-[860px] flex-col gap-4 overflow-hidden rounded-xl bg-[#09090A]/[99%] p-4 text-white"
			style="font-family: 'Overpass', sans-serif;"
		>
			<button class="p-2 h-24 rounded-md absolute top-0 bottom-0 right-2 my-auto z-999 -scale-x-100" onclick={() => (isOpen = !isOpen)}>
				<img src={arrow} class="h-8" alt="Open button" />
			</button>

			<div class="w-full h-full absolute top-0 left-0 right-0 bottom-0 z-0 opacity-5" style="background: linear-gradient(195deg, {ClassColors[character.profession as keyof typeof ClassColors]} 0%, rgba(9, 9, 10, 1) 100%);"></div>
			<img
				src={ClassRenders[getCharacterClass(character).toLowerCase() as keyof typeof ClassRenders]}
				class="absolute bottom-[-100px] left-[-100px] z-1 w-[600px] opacity-5 blur-[1px]"
				alt="Background"
			/>

			<div class="relative z-10 flex w-full flex-row items-center justify-between">
				<div class="flex flex-col text-xl font-black">
					<div class="flex flex-row gap-1">
						<div
							class="size-6"
							style="
								background-color: {ClassColors[character.profession as keyof typeof ClassColors]} !important;
								-webkit-mask-image: url({getCharacterIcon(character)});
								-webkit-mask-repeat: no-repeat;
								-webkit-mask-size: cover;
								mask-image: url({getCharacterIcon(character)});
								mask-repeat: no-repeat;
								mask-size: cover;
							"
							>
							</div>
						{character.name}</div>
					<div class="text-sm font-semibold text-gray-400">
						{@html parseTitle(title)}
					</div>
				</div>
				<div class="flex flex-row gap-2">
					<button class="px-4 text-lg py-1 font-semibold cursor-pointer" onclick={() => activeTab = "gear"}>Gear</button>
					<button class="px-4 text-lg py-1 font-semibold cursor-pointer" onclick={() => activeTab = "build"}>Build</button>
				</div>
			</div>
			{#if activeTab == 'gear'}
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
				<!-- <input class="toggle absolute bottom-0 left-0 right-0 mx-auto" type="checkbox" checked={fashion} onchange={() => (fashion = !fashion)} /> -->
			</div>
			{/if}
			{#if activeTab == 'build'}
				<div class="relative z-10 flex flex-col w-full h-fit gap-2 items-center justify-center">
					<div class="w-[700px] h-[145px] relative rounded-lg flex flex-row overflow-hidden gap-2 bg-[#202020]/10 justify-center items-center">
						<div class="w-full h-full bg-cover absolute -z-10" style="background-image: url({skillsBg})"></div>
						<div class="flex flex-row gap-2">
						{#each skills as skill}
							<Gw2Skill {skill} />
						{/each}
						</div>
					</div>

					{#each build.specializations as specialization}
						<Gw2Specialization {specialization} />
					{/each}
				</div>
			{/if}
		</div>
	</div>
	{/key}
	{:else}
	<div class="flex flex-col justify-center w-fit h-full">
		<button class="ml-2 p-2 bg-[#09090A]/[99%] h-24 rounded-md" onclick={() => {isOpen = !isOpen; scaleWidget()}}>
			<img src={arrow} class="h-8" alt="Open button" />
		</button>
	</div>
	{/if}
	{/if}
</div>

<style>
</style>
