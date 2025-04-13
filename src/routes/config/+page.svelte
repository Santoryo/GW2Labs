<script lang="ts">
    import { currentUser, pb } from "$lib/scripts/pocketbase";
	import { onMount } from "svelte";

    let keyVal = $state("");
    let type = $state("password");
    let msg = $state("");

    async function linkTwitch() {
        const authData = await pb
        .collection("twitchGW2")
        .authWithOAuth2({provider: "twitch"});

        if(authData.meta)
        {
            const formData = new FormData();

            formData.append("twitchId", authData.meta.id);
            await pb.collection("twitchGW2").update(authData.record.id, formData);
        }

        keyVal = authData.record.apiKey;
    }

    async function saveKey() {
        const formData = new FormData();
        formData.append("apiKey", keyVal);
        if(!$currentUser) return;
        await pb.collection("twitchGW2").update($currentUser.id, formData);

        msg = "Key saved!";
        setTimeout(() => {
            msg = "";
        }, 3000);
    }

    onMount(() => {
        if(!$currentUser) return;
        pb.collection("twitchGW2").getOne($currentUser.id).then((data) => {
            keyVal = data.apiKey;
        });
    });

</script>


<div class="flex flex-col gap-3 w-full bg-[#202020] p-4 rounded-lg h-[400px] text-white" style="font-family: 'Overpass', sans-serif;">
    {#if $currentUser}
        <div>Before using the extension, You need to do this quick setup so we can fetch the data of your character from your API key.</div>
        <div class="w-full max-w-[700px] mx-auto flex flex-row h-7">
            <input type={type} placeholder="Enter your Guild Wars 2 API Key" bind:value={keyVal} class="w-full p-1 bg-transparent" />
            <button onclick={() => {type = type == "password" ? "text" : "password"} } class="bg-[#202020] text-white h-full w-fit text-nowrap px-2">
                {type == "password" ? "View Key" : "Hide Key"}
            </button>
        </div>
        <button onclick={saveKey} class="text-black h-7 w-fit text-nowrap px-2 mx-auto bg-amber-400 hover:bg-amber-300 rounded-md transition-all duration-200">
            Save key
        </button>
        <div class="text-green-500 mt-2 text-xs h-8 w-full text-center mx-auto">
            {msg}
        </div>
        <div class="text-white">If you don't have a key, follow the steps below:</div>
        <ol class="list-decimal pl-4 text-sm">
            <li>Go to <a href="https://account.arena.net/applications" target="_blank" class="text-blue-500">official Guild Wars 2 API Key Management.</a></li>
            <li>Sign in with ArenaNet, Steam or Epic Games account</li>
            <li>Click on "New Key"</li>
            <li>Enter a name of your choice and check <b>all permission checkboxes.</b></li>
            <li>Click "Create API Key"</li>
            <li>Copy your new API key. CTRL + C</li>
            <li>Paste it in the input below and click "Save key"</li>
            <li>You are set, the viewers can see now your current account on stream!</li>
        </ol>
        <div class="text-white/50 mt-2 text-xs">If you want to remove the key, just delete the text and click "Save key" again.</div>
    {:else}
        <div>Before using the extension, You need to do this quick setup so we can fetch the data of your character from your API key.</div>
        <button onclick={linkTwitch} class="px-2 py-0.5 bg-purple-500 rounded-md w-fit mx-auto hover:bg-purple-600 transition-all duration-200">Link with Twitch</button>
    {/if}

</div>