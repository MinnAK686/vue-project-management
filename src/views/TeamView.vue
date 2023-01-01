<template>
    <div class="team">
        <v-container fluid class="mx-2">
            <div class="text-grey mb-3">Team</div>
            <v-layout>
                <v-row>
                    <v-col v-for="person in team" :key="person.name">
                        <v-card class="mx-auto" max-width="400">
                            <div class="text-center mt-3">
                                <img
                                    class="rounded-circle"
                                    height="100"
                                    width="100"
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    cover
                                />
                            </div>

                            <v-card-text class="text-center">
                                <div>{{ person.name }}</div>
                                <div class="text-grey">{{ person.role }}</div>
                            </v-card-text>

                            <v-card-actions class="ma-3">
                                <v-btn
                                    color="primary"
                                    prepend-icon="mdi-message-text"
                                >
                                    Message
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
            </v-layout>
        </v-container>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { db } from "../firebase";

let team = ref([]);
db.collection("users").onSnapshot((snap) => {
    let res = [];
    snap.docs.forEach((doc) => {
        let document = { ...doc.data(), id: doc.id };
        res.push(document);
    });
    team.value = res;
});
let people = ref([
    {
        name: "Alan",
        role: "Web Developer",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Jake",
        role: "Graphic Designer",
        image: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    {
        name: "Johnny",
        role: "Manager",
        image: "https://randomuser.me/api/portraits/men/5.jpg",
    },
]);
</script>

<style></style>
