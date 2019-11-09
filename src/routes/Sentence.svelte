<script>
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
    #wordContainer {
        position: relative;
    }
</style>

<p>{$sentence}</p>
<div id="wordContainer">
    {#each theWords as aWord, i}
        {#if i < (theWords.length - 1)}
        <span>{aWord}</span>--
        {:else}
        <span>{aWord}</span>
        {/if}
    {/each}
</div>