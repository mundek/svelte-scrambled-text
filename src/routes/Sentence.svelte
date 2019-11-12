<script>
    import { onMount } from 'svelte';
    import Draggable from '@shopify/draggable';

    onMount(() => {
        const sortable = new Draggable.Sortable(
            document.querySelector('#wordContainer'), {
                draggable: 'div',
            }
        );
        sortable.on('sortable:start', () => {
            console.log('sortable:start')
        })
        sortable.on('sortable:sort', () => {
            console.log('sortable:sort')
        })
        sortable.on('sortable:sorted', () => {
            console.log('sortable:sorted')
        })
        sortable.on('sortable:stop', () => {
            console.log('sortable:stop')
            currentSentence();
        })
    });

    import {
        sentence,
        currentResponse
    } from '../stores/quiz-store.js';

    import {
        sentenceWords
    } from '../utils/word-work.js';

    let theWords = sentenceWords($sentence);

    function currentSentence() {
        console.log("currSent");
    }
</script>

<style>
	#wordContainer {
		min-width: 100px;
		max-width: 650px;
	}

	#wordContainer>div {
		display: inline-block;
		margin: 3px 3px;
		padding: 3px 3px 12px 3px;
		color: red;
		font-size: 1em;
		background-color: chartreuse;

		cursor: pointer;
		/* text-shadow: 0 0 20px rgba(0,0,0,0.3); */
	}

	:global(.draggable-source--is-dragging) {
		visibility: hidden;
	}
</style>

<p>{$sentence}</p>
<div id="wordContainer">
    {#each theWords as aWord, i}
        {#if i < (theWords.length - 1)}
            <!-- <div class="item">{aWord}&nbsp;-&nbsp;</div> -->
            <div class="item">{aWord}</div>
        {:else}
            <div class="item">{aWord}</div>
        {/if}
    {/each}
</div>