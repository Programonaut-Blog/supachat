<script lang="ts">
  import { currentUser, supabase } from "./lib/supabase";

  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("error", error);
    }
  }
</script>

<div class="flex flex-col items-center justify-center w-full py-20">
  <p>{$currentUser.email}</p>
  <button
    class="group relative flex w-1/2 justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2"
    on:click={handleSignOut}
  >
    <span class="absolute inset-y-0 left-0 flex items-center pl-3" />
    Sign Out
  </button>
</div>
