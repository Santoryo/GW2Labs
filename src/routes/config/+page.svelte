<script lang="ts">
  import { currentUser, pb } from "$lib/scripts/pocketbase";
	import { supabase } from "$lib/scripts/supabase";
	import type { User } from "@supabase/supabase-js";
	import { onMount } from "svelte";

    let keyVal = $state("");
    let type = $state("password");
    let msg = $state("");
    let user: User | null = $state(null);
    let userDetails: any | null = $state(null);
    let session: any = $state(null);



      async function linkTwitch() {
        const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "twitch",
        options: {
            skipBrowserRedirect: true,
            redirectTo: window.location.origin + window.location.pathname
        }
        });

          if (data?.url) {
            window.open(
            data.url,
            "twitch-oauth",
            "width=500,height=700"
            );
        }
    }

    async function saveKey() {
        msg = "Verifying key, please wait...";
        const res = await fetch("https://api.tyria.tools/users", {
            method: "POST", 
            headers: {
                "Authorization": `Bearer ${session.data.session?.access_token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                apiKey: keyVal,
                twitchId: user?.user_metadata.provider_id
            })
        })

        if(res.ok)
        {
            const info = await res.json();
            console.log(info);
            msg = `Key saved! Account retrieved: ${info.name}, you can enjoy your extension now!`;
        }
        else
        {
            const info = await res.json();
            msg = `Error ${info.message}`;
        }
    }

onMount(async () => {

  console.log(window.location);

  // Initial load
  const { data } = await supabase.auth.getUser();
  user = data.user;

  if (user) {
    session = await supabase.auth.getSession();
    await loadUserDetails();
  }

  // 🔥 This fires when popup OAuth completes
  supabase.auth.onAuthStateChange(async (event, sessionData) => {
    if(!sessionData) return null;
    if (event === "SIGNED_IN") {
      user = sessionData.user;
      session = { data: { session: sessionData } };
      await loadUserDetails();
      window.close()
    }
  });

});

supabase.auth.onAuthStateChange((event) => {
  if (event === "SIGNED_IN" && window.opener) {
    window.close();
  }
});

async function loadUserDetails() {
  const res = await fetch("https://api.tyria.tools/users/", {
    headers: {
      authorization: `Bearer ${session.data.session?.access_token}`
    }
  });
  userDetails = await res.json();
  keyVal = userDetails.apiKey;
}


</script>


<div class="flex flex-col gap-3 w-full bg-[#202020] p-4 rounded-lg h-[400px] text-white" style="font-family: 'Overpass', sans-serif;">
    {#if user}
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
        <!-- <div class="text-white/50 mt-2 text-xs">If you want to remove the key, just delete the text and click "Save key" again.</div> -->
    {:else}
        <div>Before using the extension, You need to do this quick setup so we can fetch the data of your character from your API key.</div>
        <a href="https://link.tyria.tools/" class="px-2 py-0.5 bg-purple-500 rounded-md w-fit mx-auto hover:bg-purple-600 transition-all duration-200">Link with Guild Wars 2 API key with Twitch</a>
    {/if}

</div>