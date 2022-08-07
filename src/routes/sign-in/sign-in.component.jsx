import { 
    signInWithGooglePopup,
    createUserDocumentFromAuth 
} from "../../utils/firebase/fitebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user); 
        console.log(user);
    }
    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                sign in with Google popup
            </button>
        </div>
    )
}

export default SignIn;