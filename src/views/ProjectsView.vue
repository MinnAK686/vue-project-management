<template>
    <div class="projects">
        <v-container fluid class="mx-2">
            <div class="text-grey font-weight-bold mb-3">My Projects</div>
            <div v-if="myProjects.length > 0">
                <v-expansion-panels>
                    <v-expansion-panel
                        v-for="project in myProjects"
                        :key="project.title"
                    >
                        <v-expansion-panel-title>
                            <template v-slot:default="{ expanded }">
                                <v-row no-gutters>
                                    <v-col
                                        cols="4"
                                        class="d-flex justify-start"
                                    >
                                        {{ project.title }}
                                    </v-col>
                                    <v-col cols="8" class="text-grey">
                                        <v-fade-transition leave-absolute>
                                            <span v-if="expanded" key="0">
                                                Due by {{ project.due }}
                                            </span>
                                        </v-fade-transition>
                                    </v-col>
                                </v-row>
                            </template>
                        </v-expansion-panel-title>
                        <v-expansion-panel-text>
                            <p>{{ project.content }}</p>
                        </v-expansion-panel-text>
                    </v-expansion-panel>
                </v-expansion-panels>
            </div>
            <div v-else>
                <div class="text-center my-6">
                    <div>No projects yet</div>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { computed } from "@vue/runtime-core";
import user from "../composables/getUser";
import { db } from "../firebase";

let projects = ref([]);

db.collection("projects")
    .orderBy("addedTime")
    .onSnapshot((snap) => {
        let result = [];
        snap.docs.forEach((doc) => {
            let document = { ...doc.data(), id: doc.id };
            result.push(document);
        });
        projects.value = result;
    });

let myProjects = computed(() => {
    return projects.value.filter((project) => {
        return project.person === user.value.displayName;
    });
});

let date = ref(null);
</script>

<style></style>
