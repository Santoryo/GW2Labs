<script lang="ts">
	import type { Skill } from "$lib/interfaces/GW2Build";


    interface Props {
        skill: Skill;
    }

    let { skill }: Props = $props();
</script>

<div class="w-20 h-fit flex flex-col gap-1">
    <div class="size-20 relative overflow-hidden rounded-lg">
        <div
            class="absolute top-0 right-0 w-full h-full bg-cover scale-140"
            style="background-image: url({skill.icon})"
        ></div>
    </div>
    <div class="w-full text-wrap text-center text-xs font-semibold text-gray-200">
        {skill.name}
    </div>

</div>