import { readable, writable } from 'svelte/store';

export const sentence = writable("I'm all mixed up!");
export const currentResponse = writable("");
