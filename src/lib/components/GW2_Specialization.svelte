<script lang="ts">
    import type { Specialization } from "$lib/interfaces/GW2Build";
    import hexagon from '$lib/assets/other/hexagon.png';
	import { onMount, tick } from "svelte";
    import { nanoid } from "nanoid";
    import { scaleState } from "$lib/store/scale.svelte";

    interface Props {
        specialization: Specialization;
    }

    let elem: HTMLDivElement | null = $state(null);
    let baseId = nanoid();

    let { specialization }: Props = $props();

    let majorTraitRows = $state([
        specialization.major_traits.slice(0, 3),
        specialization.major_traits.slice(3, 6),
        specialization.major_traits.slice(6, 9),
    ]);


    function drawLineBetween(elem1: HTMLElement | null, elem2: HTMLElement | null) {
    if (!elem1 || !elem2 || !elem) return;

    const elemRect = elem.getBoundingClientRect();
    const elem1Rect = elem1.getBoundingClientRect();
    const elem2Rect = elem2.getBoundingClientRect();

    const elem1X = (elem1Rect.left + elem1Rect.width / 2 - elemRect.left);
    const elem1Y = (elem1Rect.top + elem1Rect.height / 2 - elemRect.top);
    const elem2X = (elem2Rect.left + elem2Rect.width / 2 - elemRect.left);
    const elem2Y = (elem2Rect.top + elem2Rect.height / 2 - elemRect.top);

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "absolute");
    svg.setAttribute("style", "left: 0; top: 0; width: 100%; height: 100%; z-index: -1; pointer-events: none;");

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", elem1X.toString());
    line.setAttribute("y1", elem1Y.toString());
    line.setAttribute("x2", elem2X.toString());
    line.setAttribute("y2", elem2Y.toString());
    line.setAttribute("stroke", "white");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("class", "walking-ants");

    svg.appendChild(line);
    elem.appendChild(svg);
}

    onMount(async () => {
        const prevScale = scaleState.scale;
        await tick();
        scaleState.scale = 1;
        await tick();
        drawLines();
        await tick();
        scaleState.scale = prevScale;
    });

    

function drawLines()
{
    const elements = {
        hex: document.getElementById("hex" + baseId),
        minor: [
            document.getElementById("minor0" + baseId),
            document.getElementById("minor1" + baseId),
            document.getElementById("minor2" + baseId),
        ],
        major: majorTraitRows.map(row =>
            row.filter(trait => trait.active).map(trait => document.getElementById("major" + trait.id))
        ),
    };

    drawLineBetween(elements.hex, elements.minor[0]);
    drawLineBetween(elements.minor[0], elements.major[0][0]);
    drawLineBetween(elements.major[0][0], elements.minor[1]);
    drawLineBetween(elements.minor[1], elements.major[1][0]);
    drawLineBetween(elements.major[1][0], elements.minor[2]);
    drawLineBetween(elements.minor[2], elements.major[2][0]);
}

</script>

<div class="w-[700px] h-[145px] relative rounded-lg flex flex-row overflow-hidden">
    <div class="absolute w-[700px] h-[145px] z-200 left-0 top-0 origin-left" bind:this={elem}></div>

    <div class="flex flex-row gap-2 w-full h-full relative z-1000 items-center justify-around pl-54 pr-8">
        <div class="h-10 hexagon flex items-center justify-center relative overflow-hidden">
            <img src={specialization.minor_traits[0].icon} class="absolute scale-120" alt="Minor Trait Icon" id="minor0{baseId}" />
        </div>

        {#each majorTraitRows as row, i}
            <div class="h-full flex flex-col justify-around">
                {#each row as trait, j}
                    <img 
                        src={trait.icon} 
                        alt="Major Trait Icon" 
                        class="size-9"
                        id="major{trait.id}"
                        class:brightness-40={!trait.active} 
                    />
                {/each}
            </div>
            {#if i < 2}
                <div class="h-10 hexagon flex items-center justify-center relative overflow-hidden">
                    <img src={specialization.minor_traits[i + 1].icon} class="absolute scale-120" alt="Minor Trait Icon" id="minor{i + 1}{baseId}" />
                </div>
            {/if}
        {/each}
    </div>

    <div class="w-0 h-full absolute left-46 bg-red-500" id="hex{baseId}"></div>
    <img src={hexagon} class="absolute top-0 bottom-0 left-20 w-auto h-auto my-auto" alt="Hexagon Background" />

    {#if specialization.elite && specialization.weapon_trait}
        <img src={specialization.weapon_trait.icon} class="absolute bottom-4 left-36 size-9 z-20" alt="Elite Specialization Icon" />
    {/if}

    <!-- Background image -->
    <div class="absolute inset-0 overflow-hidden -z-10">
        <div 
            class="absolute bottom-0 left-0 w-[1110px] aspect-[1110/278] bg-cover bg-bottom"
            style="background-image: url('{specialization.background}')"
        ></div>
    </div>
</div>

<style>
.hexagon {
    aspect-ratio: cos(30deg);
    clip-path: polygon(-50% 50%, 50% 100%, 150% 50%, 50% 0);
}
</style>

