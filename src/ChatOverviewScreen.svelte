<script lang="ts">
    import { onMount } from "svelte";
    import ChatCard from "./components/ChatCard.svelte";
    import { currentUser, supabase } from "./lib/supabase";
    import type { chat_with_users, chat_with_users_email } from "./types/custom";

    let newUserEmail = "";

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
                    console.log('chats changed');
                    ({ data: allChats } = await getAllChats());
                }
            )
            .subscribe()
    })

    async function createChatWithUser() {
        const {data: otherUser} = await supabase
            .from('profiles')
            .select('id')
            .eq('email', newUserEmail)
            .single()

        if (otherUser) {
            const {data: chat} = await supabase
                .from('chats')
                .insert({})
                .select()
                .single()

            const {data, error} = await supabase
                .from('chats_users')
                .insert([
                    {
                        chat_id: chat.id,
                        user_id: $currentUser.id
                    },
                    {
                        chat_id: chat.id,
                        user_id: otherUser.id
                    }]
                )

            console.log(data, error);
            
        }
    }
</script>

<div class="p-8 space-y-2">
    {#each allChats as chat}
        <ChatCard {chat} />
    {/each}
    <div class="p-4 bg-gray-100 shadow rounded">
        <input type="email" bind:value={newUserEmail}/>
        <button class="bg-gray-200 rounded p-2 hover:bg-gray-300" on:click={createChatWithUser}>Create chat</button>
    </div>
</div>