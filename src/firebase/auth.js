import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword, GoogleAuthProvider, gnInWithEmailAndPassword } from "./firebase/auth"


export const doCreateUserWithEmailAndPassword = async (email, password) => {
    return createUserWithEmailAndPassword (auth, email, password);
};

export const dosigninwithemailandpassword = (email, password) => {
    return signInWithEmailAndPassword (auth, email, password)
};
export const doSigninWithGoogle = async () => {
    const provider = new GoogleAuthProvider ();
    const result =  await signInWithPopup(auth, provider);
    //result.user
    return result
}
    export const doSignOut = () => {
     return auth.signOut();
    }