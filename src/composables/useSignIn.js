import { ref } from "vue";
import { auth } from "../firebase";

let error = ref(null);

let signInUser = async (email, password) => {
    try {
        let res = await auth.signInWithEmailAndPassword(email, password);
        if (!res) {
            throw new Error("Can't sign in user");
        }
        return res;
    } catch (e) {
        error.value = e.message;
    }
};

let useSignIn = () => {
    return {
        signInUser,
        error,
    };
};

export default useSignIn;
