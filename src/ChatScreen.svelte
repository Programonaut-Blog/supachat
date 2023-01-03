<script lang="ts">
  import { onMount } from "svelte";
    import MessageCard from "./components/MessageCard.svelte";
    import { currentUser, supabase } from "./lib/supabase";
    import type { message } from "./types/custom";

    export let params: { id: string } = {id: ""};
    let chatId = params.id;

    let allMessages: message[] = [];
    let newMessage: string = "";
    let messagesWatcher;

    async function getAllMessages() {
        return await supabase
            .from('messages')
            .select('*')
            .eq('chat_id', chatId)
    }


    onMount(async () => {
        ({ data: allMessages } = await getAllMessages());

        messagesWatcher = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'messages' },
                async () => {
                    console.log('messages changed');
                    ({ data: allMessages } = await getAllMessages());
                }
            )
            .subscribe()
    })

    async function sendMessage() {
        const {data, error} = await supabase
            .from('messages')
            .insert([
                {
                    chat_id: parseInt(chatId),
                    author_id: $currentUser.id,
                    content: newMessage
                }
            ])
    }
</script>

<div class="flex flex-col space-y-1 p-2">
    {#each allMessages as message}
        <MessageCard own={message.author_id === $currentUser.id}>
            {message.content}
        </MessageCard>
    {/each}
</div>

<div class="absolute bottom-0 flex w-full space-x-4">
    <input bind:value={newMessage} type="text" placeholder="Message" class="flex-1" />
    <button on:click={sendMessage} class="bg-gray-200 rounded p-2 hover:bg-gray-300">Send</button>
</div>