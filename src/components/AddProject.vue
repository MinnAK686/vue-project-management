<template>
    <div class="text-center">
        <v-dialog v-model="dialog">
            <template v-slot:activator="{ props }">
                <v-btn color="primary" v-bind="props" class="ma-3">
                    Add Project
                </v-btn>
            </template>

            <v-layout>
                <v-row justify="center">
                    <v-col cols="12" sm="10" md="6" lg="5">
                        <v-card class="py-5 px-3">
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-text-field
                                    v-model="title"
                                    :rules="titleRules"
                                    label="Name"
                                    required
                                ></v-text-field>

                                <v-text-field
                                    v-model="content"
                                    :rules="contentRules"
                                    label="Content"
                                    required
                                ></v-text-field>
                                <Datepicker
                                    v-model="date"
                                    :format="formattingDate"
                                ></Datepicker>
                                <v-checkbox
                                    v-model="checkbox"
                                    label="Complete?"
                                ></v-checkbox>

                                <v-btn
                                    color="indigo"
                                    class="mr-4"
                                    @click="addProject"
                                    :loading="loading"
                                    :disabled="loading"
                                >
                                    Add Project
                                </v-btn>
                            </v-form>
                        </v-card>
                    </v-col>
                </v-row>
            </v-layout>
        </v-dialog>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import format from "date-fns/format";
import user from "../composables/getUser";
import { db, serverTime } from "../firebase";

let emit = defineEmits(["addedProject"]);
let title = ref("");
let content = ref("");
let checkbox = ref(false);
let valid = ref(true);
let form = ref();
let date = ref(new Date());
let titleRules = ref([
    (v) => !!v || "Title is required",
    (v) => (v && v.length > 4) || "Title must be at least 5 characters",
]);
let contentRules = ref([
    (v) => !!v || "Content is required",
    (v) => (v && v.length > 9) || "Title must be at least 10 characters",
]);

const formattingDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
};

let loading = ref(false);

let addProject = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        loading.value = true;
        let fd = format(date.value, "do/MMM/yyyy");
        let status = checkbox.value ? "complete" : "ongoing";
        let project = {
            title: title.value,
            content: content.value,
            due: fd,
            status,
            person: user.value.displayName,
            addedTime: serverTime,
        };

        db.collection("projects")
            .add(project)
            .then(() => {
                loading.value = false;
                emit("addedProject");
                dialog.value = false;
            })
            .catch((e) => {
                console.log(e.message);
                console.log("Can't add project");
            });
    }
};

let dialog = ref(false);
</script>

<style></style>
