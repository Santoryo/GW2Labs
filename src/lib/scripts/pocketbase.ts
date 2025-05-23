import { PUBLIC_POCKETBASE } from '$env/static/public';
import PocketBase from 'pocketbase';
import { writable } from 'svelte/store';

export const pb = new PocketBase(PUBLIC_POCKETBASE);
export const currentUser = writable(pb.authStore.model);

pb.authStore.onChange((auth) => {
    currentUser.set(pb.authStore.model);
})
