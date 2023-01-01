import { ref } from "vue";
import { auth, db, serverTime } from "../firebase";

let error = ref(null);

let signUpUser = async (uname, email, password, role) => {
    try {
        let res = await auth.createUserWithEmailAndPassword(email, password);
        if (!res) {
            throw new Error("Can't create error");
        }
        let userInfo = {
            displayName: uname,
            email,
            password,
            createdAt: serverTime,
            role,
        };
        await db.collection("users").add(userInfo);
        await res.user.updateProfile({ displayName: uname });
        return res;
    } catch (e) {
        error.value = e.message;
    }
};

let useSignUp = () => {
    return {
        signUpUser,
        error,
    };
};

export default useSignUp;
