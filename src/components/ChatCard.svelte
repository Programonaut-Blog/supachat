<script lang="ts">
  import type { chat_with_users_email } from "../types/custom";
  export let chat: chat_with_users_email;

  function getChatUserNames () {
    let users = chat.users;
    if (users instanceof Array) {
      return users.map((user) => {
        return user.user instanceof Array ? user.user[0].email : user.user.email;
      }).join(", ");
    }
    return "";
  }
  const chatUserNames = getChatUserNames();
</script>

<div class="p-4 bg-gray-100 shadow rounded">
    <h2 class="text-large font-semibold">Chat with: {chatUserNames}</h2>
</div>
