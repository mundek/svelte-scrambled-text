import { readable, writable } from 'svelte/store';

export const sentence = writable("I'm all mixed up; are you?");
export const currentResponse = writable("");
