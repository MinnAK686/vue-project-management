<template>
    <h3 class="text-grey text-center mb-4">Sign in</h3>
    <v-form ref="form" v-model="valid" lazy-validation>
        <div v-if="error">
            <div class="text-error text-center my-3">{{ error }}</div>
        </div>
        <v-text-field
            variant="underlined"
            v-model="email"
            :rules="emailRules"
            label="E-mail"
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
            @click="signin"
            :loading="loading"
            :disabled="loading"
        >
            Sign in
        </v-btn>
    </v-form>
</template>

<script setup>
import { ref } from "@vue/reactivity";
import { useRouter } from "vue-router";
import useSignIn from "../composables/useSignIn";

let router = useRouter();
let { signInUser, error } = useSignIn();
let form = ref();
let valid = ref(true);
let email = ref("");
let password = ref("");
let checkbox = ref(false);
let loading = ref(false);

let emailRules = ref([
    (v) => !!v || "E-mail is required",
    (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
]);
let passwordRules = ref([(v) => !!v || "Password is required"]);

let signin = async () => {
    const { valid } = await form.value.validate();
    if (valid) {
        loading.value = true;
        let res = await signInUser(email.value, password.value);
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

<style>
.v-input__control .v-field__append-inner i {
    cursor: pointer !important;
}
/* {
} */
</style>
