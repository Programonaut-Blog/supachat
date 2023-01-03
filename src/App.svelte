<script lang="ts">
  import LoginScreen from "./LoginScreen.svelte";
  import { currentUser } from "./lib/supabase";
  import UserScreen from "./UserScreen.svelte";
  import Router, { push } from "svelte-spa-router";
  import ChatOverviewScreen from "./ChatOverviewScreen.svelte";
  import ChatScreen from "./ChatScreen.svelte";
  import { onMount } from "svelte";

  const routes = {
    "/": LoginScreen,
    "/user": UserScreen,
    "/chats": ChatOverviewScreen,
    "/chats/:id": ChatScreen
  };
</script>

<!-- {#if !$currentUser}
  <LoginScreen />
{:else}
  <UserScreen />
{/if} -->

<Router {routes} />
