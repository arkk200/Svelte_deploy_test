<script>
  import { createEventDispatcher } from "svelte";
  import { blurOnKey } from "./util";

  export let categoryId;
  export let dnd;
  export let item;

  const dispatch = createEventDispatcher();
  let editing = false;
</script>

<li>
  <input type="checkbox" bind:checked={item.packed} />
  {#if editing}
    <!-- svelte-ignore a11y-autofocus -->
    <input
      autofocus
      bind:value={item.name}
      on:blur={() => (editing = false)}
      on:keydown={blurOnKey}
      type="text"
    />
  {:else}
    <button
      class="packed-{item.packed} item-name"
      draggable={true}
      on:dragstart={(event) => dnd.drag(event, categoryId, item.id)}
      on:click={() => (editing = true)}
    >
      {item.name}
    </button>
  {/if}
  <button class="icon" on:click={() => dispatch("delete")} data-testid="delete"
    >&#x1F5D1;</button
  >
</li>

<style>
  button {
    background-color: transparent;
    border: none;
    margin-bottom: 0;
  }

  input[type="checkbox"] {
    --size: 1.5rem;
    height: var(--size);
    margin-bottom: 0;
    width: var(--size);
  }

  input[type="text"] {
    border: solid lightgray 1px;
  }

  li {
    display: flex;
    align-items: center;
  }

  .packed-true {
    color: gray;
    text-decoration: line-through;
  }

  button.item-name {
    margin: 0 0.5rem;
  }
</style>
