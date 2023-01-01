<template>
    <v-toolbar density="compact" class="py-3">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

        <v-toolbar-title class="text-grey">
            PM- <span class="font-weight-bold">Admin</span>
        </v-toolbar-title>

        <v-spacer></v-spacer>
        <v-btn class="ma-2" color="grey" @click="logout">
            Logout
            <v-icon end icon="mdi-logout"></v-icon>
        </v-btn>
    </v-toolbar>
    <div class="text-center ma-2">
        <!-- <v-btn @click="snackbar = true"> Open Snackbar </v-btn> -->
        <v-snackbar v-model="snackbar" timeout="2000">
            {{ text }}

            <template v-slot:actions>
                <v-btn color="pink" variant="text" @click="snackbar = false">
                    Close
                </v-btn>
            </template>
        </v-snackbar>
    </div>

    <!-- Navigation Drawer -->
    <v-layout>
        <v-navigation-drawer v-model="drawer" temporary class="py-5 bg-indigo">
            <v-list-item
                prepend-avatar="https://randomuser.me/api/portraits/men/78.jpg"
                :title="user.displayName"
            ></v-list-item>

            <AddProject @addedProject="projectAdded"></AddProject>

            <v-divider class="my-5"></v-divider>

            <v-list>
                <v-list-item
                    v-for="link in links"
                    :key="link.title"
                    :value="link"
                    active-color="white"
                    rounded="xl"
                    router
                    :to="link.route"
                >
                    <template v-slot:prepend>
                        <v-icon :icon="link.icon"></v-icon>
                    </template>

                    <v-list-item-title v-text="link.title"></v-list-item-title>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </v-layout>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import user from "../composables/getUser";
import { auth } from "../firebase";
import AddProject from "./AddProject.vue";

let router = useRouter();
let logout = async () => {
    auth.signOut()
        .then(() => {
            router.push("/");
        })
        .catch((e) => console.log(e.message));
};
let snackbar = ref(false);
let text = ref("Added Successful");
let links = ref([
    { title: "Dashboard", icon: "mdi-view-dashboard", route: "/dashboard" },
    { title: "My Projects", icon: "mdi-folder", route: "/projects" },
    { title: "Team", icon: "mdi-account", route: "/team" },
]);

let projectAdded = () => {
    drawer.value = false;
    snackbar.value = true;
};

let drawer = ref(null);
</script>

<style></style>
