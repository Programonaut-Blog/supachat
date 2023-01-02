<script lang="ts">
    import { onMount } from "svelte";
  import ChatCard from "./components/ChatCard.svelte";
    import { currentUser, supabase } from "./lib/supabase";
  import type { chat_with_users, chat_with_users_email } from "./types/custom";

    let allChats: chat_with_users_email[] = [];
    let chatsWatcher;

    async function getAllChats() {
        // get all chats where the current user is a member
        const { data: chatIds } = await supabase
            .from('chats')
            .select('id, users:chats_users!inner(user_id)')
            .eq('users.user_id', $currentUser.id)

        // get all chats with the user profiles
        return await supabase
            .from('chats')
            .select('*, users:chats_users!inner(user:profiles(email))')
            .in('id', [chatIds.map(chat => chat.id)])
    }

    onMount(async () => {
        ({ data: allChats } = await getAllChats());
        
        chatsWatcher = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'chats' },
                async () => {
                    ({ data: allChats } = await getAllChats());
                }
            )
            .subscribe()
    })
</script>

<div class="p-8">
    {#each allChats as chat}
        <ChatCard {chat} />
    {/each}
</div>