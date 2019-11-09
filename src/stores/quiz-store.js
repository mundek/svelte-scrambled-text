import { readable, writable } from 'svelte/store';

export const sentence = writable('This is an example sentence that just keeps going on and on and on and on and on.');
export const currentResponse = writable("");
