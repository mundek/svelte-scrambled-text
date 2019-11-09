import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		appName: 'Sentence Scramble'
	}
});

export default app;