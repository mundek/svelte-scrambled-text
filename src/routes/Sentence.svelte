<script>
    // svelte-provided lifecycle hooks
    // onMount enables attaching draggable/sortable behavior to wordContainer element's children
    // tick enables awaiting DOM update of wordContainer element's children after completion of drag-and-drop action
    import { onMount, tick } from 'svelte';
    // Shopify's Draggable module(s) to enable draggability/sortability of wordContainer element's children
    import Draggable from '@shopify/draggable';

    onMount(() => {
        const containers = document.querySelectorAll('.wordContainer');
        // what's up with 'appendTo:' bit below?
        const sortable = new Draggable.Sortable(containers, {
            draggable: '.textTile',
            appendTo: (source) => source.parentNode,
            // mirror: {
            //     constrainDimensions: true,
            // },
        });

        sortable.on('drag:start', (event) => {
            event.originalSource.classList.add('original-source');
        });

        sortable.on('drag:stop', (event) => {
            event.originalSource.classList.remove('original-source');
            // update store value ($currentResponse) by parsing current elements in target field
            parseCurrentSentence();
        });
    });

    // import svelte store
    import {
        sentence,
        currentResponse
    } from '../stores/quiz-store.js';

    // import word-parsing utility functions(s)
    import {
        sentenceWords,
        wordsToString,
        wordsScrambled
    } from '../utils/word-work.js';

    // create parsed sentence (theWords) and save original sentence for reference (referenceSentence) when comparing user's response
    // sentenceWords(String, '[strip|retain|separate]'')

    // set parsing mode constant for following call to sentenceWords()
    // ???: Link to store/state later? (too global?) Make it an attribute associated with questions/question sets?
    const PUNCT = 'retain';

    let theWords = sentenceWords($sentence, PUNCT);
    let referenceSentence = wordsToString(theWords);

    // scramble the words
    theWords = wordsScrambled(theWords);

    // initialize currentResponse with scrambled words; updated 
    // $currentResponse = wordsToString(theWords); 

    // initialize currentResponse with empty string 
    $currentResponse = ""; 

    // parseCurrentSentence() is async to await any update(s) ('await tick()') of DOM before selecting parent ('target' container: #wordDestination) element's children
    // iterate through current arrangement of 'draggable' elements to construct a String for comparison with the original (parsed) sentence
    async function parseCurrentSentence() {
        // console.log("parseCurrentSentence");
        // imported 'tick()' waits until DOM has been updated before method selects parent ('target' container: #wordDestination) element's children ('.textTile')
        await tick();
        let c = document.querySelectorAll("#wordDestination .textTile");
        // console.log(c.constructor.name)

        // word-work.js utility function takes element (or element.innerText) values of draggable elements and concatenates them into a string (with some implementation of punctuation sensitive whitespace additions)
        $currentResponse = wordsToString(Array.from(c));
        // console.log(parsedSentence);
    }

    function clickResponse(element) {
        // store the target node
        let theNode = element.target;
        // get that node's parent
        let parentNode = theNode.parentNode;
        // remove the targeted node, store returned node (should be the removed node!)
        let removedNode = parentNode.removeChild(theNode);
        // init as yet unselected newParent to store selfsame
        let newParent = undefined;

        // select correct newParent container element
        if (parentNode.id === "wordSource") {
            newParent = document.querySelector("#wordDestination");
        } else if (parentNode.id === "wordDestination") {
            newParent = document.querySelector("#wordSource");
        }
        newParent.appendChild(removedNode);

        // update store value ($currentResponse) by parsing current elements in target field
        parseCurrentSentence();
    }
</script>

<style>
    .backgroundText {
        font-family: 'Courier New', Courier, monospace;
        font-size: 1em;
    }
    .wordContainer {
		min-width: 100px;
		max-width: 750px;
        min-height: 200px;
        max-height: 600px;
        user-select: none;
    }
	#wordSource {
        background-color: darkgray;
	}

	#wordDestination {
        background-color: khaki;
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

<!-- <p>ORIGINAL: <em>{$sentence}</em></p> -->
<!-- <p>REFERENCE: <em>{referenceSentence}</em></p> -->
<!-- <p>CURRENT: <em>{$currentResponse}</em></p> -->

<div class="wordContainer" id="wordDestination">
    {#if !($currentResponse)}
        <p class="backgroundText">reconstructed sentence goes here ...</p>
    {/if}
</div>
{#if theWords !== -1}
    <div class="wordContainer" id="wordSource">
        {#each theWords as aWord, i}
            <div class="textTile" id="{i}" on:click={clickResponse}>{aWord}</div>
        {/each}
    </div>
{:else}
    <h2>TEXT PARAMETER ERROR!</h2>
{/if}

{#if referenceSentence === $currentResponse}
    <p>CORRECT</p>
{:else}
    <p>WRONG</p>
{/if}
