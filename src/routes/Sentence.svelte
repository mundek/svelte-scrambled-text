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
        /* position: relative; */
        width: 900px;
        display: flex;
        flex-wrap: wrap;
    }
</style>

<p>{$sentence}</p>
<div id="wordContainer">
    {#each theWords as aWord, i}
        {#if i < (theWords.length - 1)}
            <div>{aWord}</div>&nbsp;-&nbsp;
        {:else}
            <div>{aWord}</div>
        {/if}
    {/each}
</div>