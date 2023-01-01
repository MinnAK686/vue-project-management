<template>
    <div class="dashboard">
        <v-container fluid class="mx-2">
            <div class="text-grey">Dashboard</div>
            <div v-if="projects.length > 0">
                <v-layout>
                    <v-row>
                        <v-col>
                            <v-btn
                                class="ma-3"
                                prepend-icon="mdi-folder"
                                @click="sortBy('title')"
                            >
                                Projects
                                <v-tooltip activator="parent" location="top">
                                    Sort by projects
                                </v-tooltip>
                            </v-btn>
                            <v-btn
                                prepend-icon="mdi-calendar-range"
                                class="ma-3"
                                @click="sortBy('addedTime')"
                            >
                                Due
                                <v-tooltip activator="parent" location="top">
                                    Sort by date
                                </v-tooltip>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-layout>
                <!-- All Projects -->
                <v-layout>
                    <v-card class="w-100 pa-3 mb-2" flat>
                        <v-row
                            v-for="project in projects"
                            :key="project.title"
                            align="center"
                            :class="`project ${project.status}`"
                        >
                            <v-col cols="12" sm="6" md="6" lg="3">
                                <div class="text-subtitle-1 text-grey mb-2">
                                    Project Title
                                </div>
                                <div>{{ project.title }}</div>
                            </v-col>
                            <v-col cols="6" sm="3" md="2" lg="3">
                                <div class="text-subtitle-1 text-grey mb-2">
                                    Person
                                </div>
                                <div>{{ project.person }}</div>
                            </v-col>
                            <v-col cols="6" sm="3" md="2" lg="3">
                                <div class="text-subtitle-1 text-grey mb-2">
                                    Due by
                                </div>
                                <div>{{ project.due }}</div>
                            </v-col>
                            <v-col cols="12" sm="6" md="2" lg="3">
                                <v-chip :class="`${project.status} text-white`">
                                    {{ project.status }}
                                </v-chip>
                            </v-col>
                            <v-divider></v-divider>
                        </v-row>
                    </v-card>
                </v-layout>
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
import { db } from "../firebase";
import user from "../composables/getUser";
import { watch } from "vue";
import { useRouter } from "vue-router";

let router = useRouter();
watch(user, () => {
    if (user.value) {
        router.push("/");
    }
});

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

let sortBy = (v) => {
    projects.value.sort((x, y) => (x[v] < y[v] ? -1 : 1));
};
</script>

<style>
.v-chip.complete {
    background-color: seagreen;
}
.v-chip.ongoing {
    background-color: yellow;
}
.project.complete {
    border-left: 4px solid seagreen;
}
.project.ongoing {
    border-left: 4px solid yellow;
}
</style>
