<template>
    <div class="h-screen bg-grey-lighten-3">
        <div v-if="user">
            <Navbar></Navbar>
        </div>
        <router-view />
    </div>
</template>

<script setup>
import Navbar from "./components/Navbar.vue";
import user from "./composables/getUser";
</script>
<style>
body {
    overflow-x: hidden;
}
</style>
