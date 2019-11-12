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
</script>

<style>
    /* #wordContainer {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        min-width: 100px;
        max-width: 500px;
    }

    #wordContainer .item {
        flex-basis: auto;
        background-color: lightblue;
        margin: 0px 0px 12px 0px;
        padding: 0px 10px 0px 10px;
    }
     */

    #wordContainer {
        min-width: 100px;
        max-width: 500px;
    }

    #wordContainer>div {
		display: inline-block;
		margin: 0px;
		padding: 6px 0px 6px 0px;
		color: red;
		font-size: 1em;
        background-color: chartreuse;
        cursor: pointer;
		/* text-shadow: 0 0 20px rgba(0,0,0,0.3); */
	}

	:global(.draggable-source--is-dragging) {
		visibility: hidden;
        cursor: grabbing;
	}
</style>

<p>{$sentence}</p>
<div id="wordContainer">
    {#each theWords as aWord, i}
        {#if i < (theWords.length - 1)}
            <div class="item">{aWord}&nbsp;-&nbsp;</div>
        {:else}
            <div class="item">{aWord}</div>
        {/if}
    {/each}
</div>