<script lang="ts">
  import LoginScreen from "./LoginScreen.svelte";
  import { currentUser } from "./lib/supabase";
  import UserScreen from "./UserScreen.svelte";
  import Router, { push } from "svelte-spa-router";
  import { onMount } from "svelte";

  const routes = {
    "/": LoginScreen,
    "/user": UserScreen,
  };
</script>

<!-- {#if !$currentUser}
  <LoginScreen />
{:else}
  <UserScreen />
{/if} -->

<Router {routes} />
