<script>
    // svelte-provided lifecycle hooks
    // onMount enables attaching draggable/sortable behavior to wordContainer element's children
    // tick enables awaiting DOM update of wordContainer element's children after completion of drag-and-drop action
    import { onMount, tick } from 'svelte';
    // Shopify's Draggable module(s) to enable draggability/sortability of wordContainer element's children
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
            parseCurrentSentence();
        })
    });

    // import svelte store
    import {
        sentence,
        currentResponse,
        wordsScrambled
    } from '../stores/quiz-store.js';

    // import word-parsing utility functions(s)
    import {
        sentenceWords,
        wordsToString
    } from '../utils/word-work.js';

    // set parsing mode constant for following call to sentenceWords()
    const PUNCT = 'strip';
    // parse sentence into words (and punctuation)
    // sentenceWords(String, '[strip|retain|separate]'')
    let theWords = sentenceWords($sentence, PUNCT);
    let referenceSentence = wordsToString(theWords);

    // set an internal string for parsing the user's latest arrangement of words/punctuation
    $: parsedSentence = $currentResponse;

    // parseCurrentSentence() is async to await any update(s) ('tick()') of DOM before selecting parent (#wordContainer) element's children
    // iterate through current arrangement of 'draggable' elements to construct a String for comparison with the original (parsed) sentence
    async function parseCurrentSentence() {
        console.log("parseCurrentSentence");
        await tick();
        let c = document.querySelectorAll(".textTile");
        console.log(c.constructor.name)

        // word-work.js utility function takes element.innerText values of draggable elements and concatenates them into a string with some implementation of punctuation sensitive whitespace additions
        $currentResponse = wordsToString(Array.from(c));
        // console.log(parsedSentence);
    }
</script>

<style>
	#wordContainer {
		min-width: 100px;
		max-width: 750px;
	}

	.textTile {
		display: inline-block;
		margin: 3px 3px;
		padding: 3px 3px 12px 3px;
		color: red;
		font-size: 1.5em;
        font-family: "Lucida Console", Monaco, monospace;
		background-color: chartreuse;

		cursor: pointer;
		/* text-shadow: 0 0 20px rgba(0,0,0,0.3); */
	}

	:global(.draggable-source--is-dragging) {
		visibility: hidden;
	}
</style>

<p>ORIGINAL: <em>{$sentence}</em></p>
<p>REFERENCE: <em>{referenceSentence}</em></p>
<p>CURRENT: <em>{parsedSentence}</em></p>

{#if theWords !== -1}
    <div id="wordContainer">
        {#each theWords as aWord, i}
            <div class="textTile" id="{i}">{aWord}</div>
        {/each}
    </div>
{:else}
    <h2>TEXT PARAMETER ERROR!</h2>
{/if}

{#if referenceSentence === parsedSentence}
    <p>(referenceSentence === parsedSentence) --> TRUE</p>
{:else}
    <p>(referenceSentence === parsedSentence) --> FALSE</p>
{/if}
