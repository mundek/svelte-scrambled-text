import { readable, writable } from 'svelte/store';

export const sentence = writable("This is an example sentence, and it is in need of unscrambling.");
export const currentResponse = writable("");
