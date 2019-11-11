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
</style>

<p>{$sentence}</p>
<div id="wordContainer">
    {#each theWords as aWord, i}
        {#if i < (theWords.length - 1)}
            <div class="item">{aWord}</div>&nbsp;-&nbsp;
        {:else}
            <div class="item">{aWord}</div>
        {/if}
    {/each}
</div>