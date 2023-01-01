<template>
    <h3 class="text-grey text-center mb-4">Sign up</h3>
    <v-form ref="form" v-model="valid" lazy-validation>
        <div v-if="error">
            <div class="text-error text-center my-3">{{ error }}</div>
        </div>
        <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
            variant="underlined"
            required
        ></v-text-field>
        <v-select
            v-model="role"
            variant="underlined"
            :items="roles"
            :rules="[(v) => !!v || 'Role is required']"
            label="Role"
            required
        ></v-select>
        <v-text-field
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            variant="underlined"
            type="email"
            required
        ></v-text-field>
        <v-text-field
            variant="underlined"
            type="password"
            v-model="password"
            :rules="passwordRules"
            label="Password"
            required
        ></v-text-field>
        <v-checkbox
            v-model="checkbox"
            :rules="[(v) => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
        ></v-checkbox>

        <v-btn
            color="primary"
            class="mr-4"
            @click="signup"
            :loading="loading"
            :disabled="loading"
        >
            Sign up
        </v-btn>
    </v-form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import useSignUp from "../composables/useSignUp";
import { useRouter } from "vue-router";

let router = useRouter();
let { signUpUser, error } = useSignUp();
let form = ref();
let valid = ref(true);
let name = ref("");
let email = ref("");
let password = ref("");
let checkbox = ref(false);
let loading = ref(false);
let role = ref("");

let roles = ref(["Developer", "Tester", "Project Manager", "Designer"]);

let nameRules = ref([
    (v) => !!v || "Name is required",
    (v) => (v && v.length > 4) || "Name must be at least 5 characters",
]);
let emailRules = ref([
    (v) => !!v || "E-mail is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);
let passwordRules = ref([
    (v) => !!v || "Password is required",
    (v) => (v && v.length > 5) || "Password must be at least 6 characters",
]);

let signup = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        // console.log(name.value, email.value, password.value, role.value);
        loading.value = true;
        let res = await signUpUser(
            name.value,
            email.value,
            password.value,
            role.value,
        );
        if (res) {
            router.push({ name: "dashboard" });
            error.value = "";
            console.clear();
        }
        if (error.value) {
            console.log(error.value);
        }
        loading.value = false;
    }
};
</script>

<style></style>
