<script lang="ts">
	import Gw2Item from '$lib/components/GW2_Item.svelte';
	import { onMount, tick } from 'svelte';
	import {
		getBuildInfo,
		getCharacterSkills,
		getCharacterTitle,
		getItemsInfo,
		getSkinsInfo,
		parseTitle
	} from '$lib/scripts/GW2Utils';
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
	import { EquipmentAquatic, EquipmentSlots, EquipmentSlotsLeft, EquipmentSlotsRight, EquipmentWeapon } from '$lib/enums/equipmentslots';
	import { CharacterModel } from '$lib/models/character';
	import { statsIcons } from '$lib/enums/stats';
	import { slide } from 'svelte/transition';
	import jadebot from '$lib/assets/other/jadebot.png';

	let isReady = $state(false);
	let equipment: Record<string, Equipment> = $state({});
	let itemsId: number[] = $state([]);
	let itemsInfo: Record<any, ItemDetails> = $state({});
	let skinsId: number[] = $state([]);
	let skinsInfo: Record<any, SkinDetails> = $state({});
	let build: CharacterBuild = $state({} as CharacterBuild);
	let channelId: number | null = $state(149905017);
	let isOpen: boolean = $state(false);
	let skills: Skill[] = $state({} as Skill[]);
	let character: Character | null = $state(null);
	let characters: Character[] | null = $state(null);

	let title: string = $state('');

	let fashion = $state(false);

	let activeTab = $state('gear');

	let message = $state('Loading...');
	let username = $state("");

	let widget: HTMLElement | null = $state(null);
	let progressBar: HTMLElement | null = $state(null);
	let progressBarWidth: number = $state(0);

	onMount(async () => {
		window.addEventListener('resize', () => {
			scaleWidget();
		});

		if (window.Twitch && window.Twitch.ext) {
			window.Twitch.ext.onAuthorized((auth) => {
				console.log('Twitch authorized');
				channelId = auth.channelId;
			});
		} else {
			console.log('Twitch not authorized');
		}

		const res = await fetch(`https://api.tyria.tools/users/twitch/${channelId}`);
		username = (await res.json()).username;

		console.log("Fetching for user", username);
		await loadData();

		setInterval(async () => {
			await loadData();
		}, 120000);
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

	let icon = "";

	async function loadData() {
	if (!channelId) return;

	try {

		const update = await fetch(`https://api.tyria.tools/users/${username}/characters/update`, {method: "POST"});

		const res = await fetch(`https://api.tyria.tools/users/${username}/characters`);
		if (!res.ok) throw new Error('Network error');

		const characterName = (await res.json())[0];

		const characterRes = await fetch(`https://api.tyria.tools/character/${characterName}`);

		const data = await characterRes.json();
		character = data;
		progressBarWidth = 10;

		if(!character) return;

		const allItems = data.equipment;
		itemsId = allItems.flatMap(item => [item.itemId, ...(item.upgrades ?? [])]);
		skinsId = allItems.map(item => item.skinId).filter(Boolean);
		progressBarWidth = 20;

		equipment = allItems.reduce((acc, item) => {
			acc[item.slot] = item;
			return acc;
		}, {} as Record<string, Equipment>);
		progressBarWidth = 40;

		[itemsInfo, skinsInfo] = await Promise.all([
			getItemsInfo(itemsId),
			getSkinsInfo(skinsId),
		]);
		progressBarWidth = 60;

		[build, title, skills] = await Promise.all([
			getBuildInfo(character),
			getCharacterTitle(character.title),
			getCharacterSkills(character)
		]);
		progressBarWidth = 100;

		console.log(character);
		isReady = true;

	} catch (err) {
		console.error('Error loading data:', err);
	}
}
</script>

<div class="flex h-screen w-[1920px] flex-col justify-center overflow-x-hidden">
	{#if isOpen}
		{#if isReady && character}
		{#key character}
			<div
				class="ml-2 h-fit w-fit origin-left transform-gpu rounded-xl p-0.5 py-[2px]"
				style="background-image: linear-gradient(to bottom, {ClassColors[
					character.profession as keyof typeof ClassColors
				]}, transparent); transform: scale({scaleState.scale});"
				bind:this={widget}
			>
				<div
					class="relative my-auto flex size-[880px] flex-col gap-4 overflow-hidden rounded-xl bg-[#09090A]/[99%] p-4 text-white"
					style="font-family: 'Overpass', sans-serif;"
				>
					<button
						class="absolute top-0 right-2 bottom-0 z-999 my-auto h-24 -scale-x-100 rounded-md p-2"
						onclick={() => (isOpen = !isOpen)}
					>
						<img src={arrow} class="h-8" alt="Open button" />
					</button>

					<div
						class="absolute top-0 right-0 bottom-0 left-0 z-0 h-full w-full opacity-5"
						style="background: linear-gradient(195deg, {ClassColors[
							character.profession as keyof typeof ClassColors
						]} 0%, rgba(9, 9, 10, 1) 100%);"
					></div>
					<img
						src={ClassRenders[
							character.elite.toLowerCase() as keyof typeof ClassRenders
						]}
						class="absolute bottom-[-100px] left-[-100px] z-1 w-[600px] opacity-5 blur-[1px] mix-blend-multiply"
						alt="Background"
					/>

					<div class="relative z-10 flex w-full flex-row items-center justify-between">
						<div class="flex flex-col text-xl font-black">
							<div class="flex flex-row gap-1">
								<div
									class="size-6"
									style="
								background-color: {ClassColors[character.profession as keyof typeof ClassColors]} !important;
								-webkit-mask-image: url({character.professionIcon});
								-webkit-mask-repeat: no-repeat;
								-webkit-mask-size: cover;
								mask-image: url({character.professionIcon});
								mask-repeat: no-repeat;
								mask-size: cover;
							"
								></div>
								{character.name}

							</div>
							<div class="text-sm font-semibold text-gray-400 flex flex-row gap-2 items-center">
								{@html parseTitle(title)}
								{#if character.equipment.find((e) => e.slot == "PowerCore")}
								{@const powercore = character.equipment.find((e) => e.slot == "PowerCore")}
								<div class="w-0.5 h-[12px] bg-gray-800 shrink-0"></div>
								<div
									class="size-4"
									style="
								background-color: {ClassColors[character.profession as keyof typeof ClassColors]} !important;
								-webkit-mask-image: url({jadebot});
								-webkit-mask-repeat: no-repeat;
								-webkit-mask-size: cover;
								mask-image: url({jadebot});
								mask-repeat: no-repeat;
								mask-size: cover;
							"
								></div>
								{itemsInfo[powercore?.itemId].name}
								{/if}
							</div>
						</div>
						<div class="flex flex-row gap-2">
							<button
								class="cursor-pointer px-4 py-1 text-lg font-semibold"
								onclick={() => (activeTab = 'gear')}>Gear</button
							>
							<button
								class="cursor-pointer px-4 py-1 text-lg font-semibold"
								onclick={() => (activeTab = 'build')}>Build</button
							>
						</div>
					</div>
					{#if activeTab == 'gear'}
						<div class="relative z-10 flex flex-row justify-around">
							<div class="flex flex-col gap-2.5">
								{#each Object.keys(EquipmentSlotsLeft) as item}
									<Gw2Item {item} {equipment} {itemsInfo} {skinsInfo} {fashion} />
								{/each}
								<div class="w-[90%] h-0.5 my-1 opacity-10 mx-auto rounded-full" style="background-color: {ClassColors[character.profession as keyof typeof ClassColors]}"></div>
								{#each Object.keys(EquipmentWeapon) as item}
									<Gw2Item {item} {equipment} {itemsInfo} {skinsInfo} {fashion} />
								{/each}
							</div>
							<div class="w-0.5 h-[90%] opacity-10 shrink-0 my-auto rounded-full" style="background-color: {ClassColors[character.profession as keyof typeof ClassColors]}"></div>
							<div class="flex flex-col gap-2.5">
								{#each Object.keys(EquipmentSlotsRight) as item}
									<Gw2Item {item} {equipment} {itemsInfo} {skinsInfo} {fashion} />
								{/each}
								<div class="w-[90%] h-0.5 my-1 opacity-10 mx-auto rounded-full" style="background-color: {ClassColors[character.profession as keyof typeof ClassColors]}"></div>
								{#each Object.keys(EquipmentAquatic) as item}
									<Gw2Item {item} {equipment} {itemsInfo} {skinsInfo} {fashion} />
								{/each}
							</div>
							<label for="toggle" class="flex items-center cursor-pointer absolute right-0 -bottom-4 z-10">
								<div class="mr-3 text-sm font-semibold text-white/50 transition-all duration-300" class:!text-white={!fashion}>Gear</div>
								<input type="checkbox" id="toggle" class="sr-only peer" bind:checked={fashion}>
								<div class="block relative bg-[#272727] w-12 h-4 rounded-full before:absolute before:bg-white before:w-7 before:h-4 before:rounded-full before:transition-all before:duration-100 before:left-0 peer-checked:before:left-5 peer-checked:before:bg-white"></div>
								<div class="ml-3 text-sm font-semibold text-white/50 transition-all duration-300" class:!text-white={fashion}>Fashion</div>
							</label>						
						</div>
					{/if}
					{#if activeTab == 'build'}
						<div class="relative z-10 flex h-fit w-full flex-col items-center justify-center gap-2">
							<div
								class="relative flex h-[145px] w-[700px] flex-row items-center justify-center gap-2 overflow-hidden rounded-lg bg-[#202020]/10"
							>
								<div
									class="absolute -z-10 h-full w-full bg-cover"
									style="background-image: url({skillsBg})"
								></div>
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
		<div
			class="ml-2 h-fit w-fit origin-left transform-gpu rounded-xl p-0.5 py-[2px]"
			style="background-image: linear-gradient(to bottom, gray, transparent); transform: scale({scaleState.scale});"
			bind:this={widget}
			>
				<div
					class="relative my-auto flex size-[860px] flex-col items-center justify-center gap-4 overflow-hidden rounded-xl bg-[#09090A]/[99%] p-4 text-white"
					style="font-family: 'Overpass', sans-serif;"
				>
				<div class="flex flex-col gap-2 items-left">
					Loading...
					<div class="max-w-[300px] h-2 bg-white" style="width: {progressBarWidth}%"></div>
				</div>
				</div>
			</div>
		{/if}
	{:else}
		<div class="flex h-full w-fit flex-col justify-center">
			{#if isReady}
			<button
			onclick={() => {
					isOpen = true;
					scaleWidget();
			}}
			class="p-1 bg-black/80 rounded-sm ml-2 gap-0.5 flex flex-col items-center justify-center border border-white cursor-pointer hover:bg-black smooth">
				<div
					class="size-6"
					style="
								background-color: white !important;
								-webkit-mask-image: url({character?.professionIcon});
								-webkit-mask-repeat: no-repeat;
								-webkit-mask-size: cover;
								mask-image: url({character?.professionIcon});
								mask-repeat: no-repeat;
								mask-size: cover;
							"
				></div>
				<div><img src={arrow} class="h-4" alt="Open button" /></div>
			</button>
			{/if}

			<!-- <button
				class="ml-2 h-24 rounded-md bg-[#09090A]/[99%] p-2"
				onclick={() => {
					isOpen = true;
					scaleWidget();
					loadData();
				}}
			>
				<img src={arrow} class="h-8" alt="Open button" /> </button> -->
		</div>
	{/if}
</div>

<style>
</style>
