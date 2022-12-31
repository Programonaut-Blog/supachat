<script lang="ts">
  import LoginScreen from "./LoginScreen.svelte";
  import { currentUser } from "./lib/supabase";
  import UserScreen from "./UserScreen.svelte";
</script>

{#if !$currentUser}
  <LoginScreen />
{:else}
  <UserScreen />
{/if}
