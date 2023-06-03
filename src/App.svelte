<script>
  import Checklist from "./Checklist.svelte";
  import Login from "./Login.svelte";
  import NotFound from "./NotFound.svelte";
  import Router from "svelte-spa-router";
  import { wrap } from "svelte-spa-router/wrap";

  const routes = {
    "/login": Login,
    "/checklist": Checklist,
    "/": wrap({
      asyncComponent: () => Login,
    }),
    "*": NotFound,
  };
  console.log(1);
</script>

<main>
  <h1 class="hero">Travel Packing Checklist</h1>
  <Router {routes} />
</main>

<style>
  :global(body) {
    background-color: cornflowerblue;
  }

  .hero {
    --height: 7rem;

    background-color: orange;
    color: white;
    font-size: 4rem;
    height: var(--height);
    line-height: var(--height);
    margin: 0 0 3rem 0;
    text-align: center;
    vertical-align: middle;
    width: 100vw;
  }

  main {
    color: white;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
</style>
