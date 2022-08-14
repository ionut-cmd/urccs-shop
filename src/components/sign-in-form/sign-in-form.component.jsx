import { useState, useContext } from "react";
import { 
    signInWithGooglePopup, 
    createUserDocumentFromAuth,
    signInAuthWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import './sign-in-form.styles.scss';
import { UserContext } from "../../contexts/user.contex";



const defaultFormFields = {
    email: '',
    password: '',
}


const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const {setCurrentUser} = useContext(UserContext)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user); 
    }

    const handleSubmit = async (event) =>{
        event.preventDefault();

       

        try {
            const {user} = await signInAuthWithEmailAndPassword(email, password);

            setCurrentUser(user);
            resetFormFields();

            
        } catch (error) {
            switch(error.code) {
                case 'auth/user-not-found':
                    alert("User dose not exist")
                    break
                case 'auth/wrong-password':
                    alert('incorrect password or email');
                    break
                default:
                    console.log(error.message);
            }
        }

    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    };

    return (
        <div className="sign-in-container">
            <h2>Already have an account?</h2>
            <span>Sign in with email and password</span>
            <form onSubmit = {handleSubmit} action="">
                <FormInput
                    label = "Email"
                    type= "email" 
                    required 
                    onChange={handleChange} 
                    name = "email" 
                    value = {email}/>
                <FormInput
                    label = "Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name = "password" 
                    value = {password}/>
                <div className= "buttons-container">
                     <Button type="submit">Sign In</Button>
                     <Button type = 'button' buttonType = 'google'  onClick={signInWithGoogle}>Google Sign In</Button>
                </div>
               
                
            </form>
        </div>
    )
}

export default SignInForm;