<template>
    <div class="dashboard">
        <v-layout class="mx-5">
            <v-row justify="center" class="mt-8">
                <v-col cols="12" sm="8" md="6" lg="4">
                    <v-card class="px-4 py-8">
                        <div v-if="toggleForm">
                            <SignIn></SignIn>
                            <div class="text-grey mt-4">
                                <p>
                                    Don't have an account?
                                    <span
                                        class="goto"
                                        @click="toggleForm = false"
                                    >
                                        Create account here
                                    </span>
                                </p>
                            </div>
                        </div>
                        <div v-else>
                            <SignUp></SignUp>
                            <div class="text-grey mt-4">
                                <p>
                                    Already have an account?
                                    <span
                                        class="goto"
                                        @click="toggleForm = true"
                                    >
                                        Sign in here
                                    </span>
                                </p>
                            </div>
                        </div>
                    </v-card>
                </v-col>
            </v-row>
        </v-layout>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import SignIn from "../components/SignIn.vue";
import SignUp from "../components/SignUp.vue";
let toggleForm = ref(true);
</script>

<style>
.goto {
    text-decoration: underline;
    cursor: pointer;
}
</style>
