<script context="module">
    export async function preload(page, { spotify }) {
        return { spotify }
    }
</script>

<script>
    export let spotify
</script>

<style>
    .main {
        text-align: center;
    }
    nav {
        height: 3rem;
        line-height: 3rem;
        background-color: bisque;
    }
    a {
        margin-left: 1rem;
        padding: 0.5rem;
    }
</style>

<nav>
    <a href='/'>Home</a>
    {#if spotify}
        <a href='view/playlists'>Playlists</a>
        <a class="login" href='/auth/logout'>Log out</a>
    {:else}
        <a class="login" href="/auth/login">Log in</a>
    {/if}
</nav>
<div class='main'>
    <slot></slot>
</div>