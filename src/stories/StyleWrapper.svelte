<script>
  export let component;
  export let style;
</script>

<div {style}>
  <svelte:component this={component} on:login on:logout />
</div>
