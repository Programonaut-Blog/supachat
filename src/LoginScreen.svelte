<script lang="ts">
  import { onMount } from "svelte";
  import { currentUser, supabase } from "./lib/supabase";
  import {push} from 'svelte-spa-router'

  let email: string;
  let password: string;
  let loading: boolean = false;
  let register: boolean = false;
  let message: string = "";

  const handleLogin = async () => {
    loading = true;

    if (register) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        message = "Incorrect email or password";
      } else {
        message = "Check your email for the login link";
      }
      register = false;
    } else {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        message = "Invalid password";
      } else {
        message = "Logged in";
        push('#/user')
      }
    }
    loading = false;
  };
</script>

<div class="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
  <div class="w-full max-w-md space-y-8">
    <div>
      <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>
    <!-- Added form action -->
    <form class="mt-8 space-y-6" on:submit|preventDefault={handleLogin}>
      <input type="hidden" name="remember" value="true" />
      <div class="-space-y-px rounded-md shadow-sm">
        <div>
          <label for="email-address" class="sr-only">Email address</label>
          <input
            id="email-address"
            name="email"
            type="email"
            autocomplete="email"
            required
            class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Email address"
            bind:value={email}
          />
        </div>
        <div>
          <label for="password" class="sr-only">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autocomplete="current-password"
            required
            class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
            placeholder="Password"
            bind:value={password}
          />
        </div>
      </div>

      {#if message}
        <div class="flex items-center justify-between">
          <p class="text-indigo-500">{message}</p>
        </div>
      {/if}

      <!-- <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900">Remember me</label>
          </div>
        </div> -->

      <div>
        <!-- Add loading indication -->
        <button
          type="submit"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          disabled={loading}
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            {#if !loading}
              <!-- Heroicon name: mini/lock-closed -->
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                  clip-rule="evenodd"
                />
              </svg>
            {:else}
              <!-- Heroicon name: arrow-path -->
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            {/if}
          </span>
          {loading ? "Signing in...." : "Sign in"}
        </button>

        <button
          type="submit"
          class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 mt-2"
          disabled={loading}
          on:click={() => (register = true)}
        >
          <span class="absolute inset-y-0 left-0 flex items-center pl-3">
            {#if loading && register}
              <!-- Heroicon name: arrow-path -->
              <svg
                class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>
            {/if}
          </span>
          {loading && register ? "Registering...." : "Register"}
        </button>
      </div>
    </form>
  </div>
</div>
